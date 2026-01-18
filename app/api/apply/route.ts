import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const vacancyId = formData.get('vacancyId') as string;
    const vacancyPosition = formData.get('vacancyPosition') as string;
    const vacancyDepartment = formData.get('vacancyDepartment') as string;
    const cvFile = formData.get('cv') as File;

    // Validate input (exactly like contact form)
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    const username = process.env.WORDPRESS_USERNAME;
    const appPassword = process.env.WORDPRESS_APP_PASSWORD;

    if (!wordpressUrl || !username || !appPassword) {
      console.error('Missing WordPress configuration');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create Basic Auth header
    const authHeader = `Basic ${Buffer.from(`${username}:${appPassword}`).toString('base64')}`;

    // Step 1: Upload CV file to WordPress media library if provided
    let cvDownloadLink = 'No CV uploaded';
    
    if (cvFile && cvFile.size > 0) {
      console.log('Uploading CV file to WordPress media library...');
      console.log('File details:', { name: cvFile.name, size: cvFile.size, type: cvFile.type });
      
      try {
        // Convert File to Buffer for proper upload
        const arrayBuffer = await cvFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Create proper FormData for WordPress
        const mediaFormData = new FormData();
        
        // Create a Blob with proper MIME type
        const blob = new Blob([buffer], { type: cvFile.type || 'application/octet-stream' });
        mediaFormData.append('file', blob, cvFile.name);
        
        console.log('Sending file to WordPress...');
        
        const mediaResponse = await fetch(`${wordpressUrl}/wp-json/wp/v2/media`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader
          },
          body: mediaFormData
        });

        console.log('WordPress media response status:', mediaResponse.status);
        
        if (mediaResponse.ok) {
          const mediaResult = await mediaResponse.json();
          const cvUrl = mediaResult.source_url;
          console.log('✅ CV uploaded successfully:', cvUrl);
          
          // Create a proper download link
          cvDownloadLink = `<a href="${cvUrl}" target="_blank" download="${cvFile.name}" style="color: #0066cc; text-decoration: underline; font-weight: bold;">${cvFile.name}</a><br><small style="color: #666;">Click to download CV (${Math.round(cvFile.size / 1024)}KB)</small>`;
        } else {
          const errorText = await mediaResponse.text();
          console.error('Failed to upload CV to WordPress:', errorText);
          
          // Fallback: Store file info and ask user to email CV
          cvDownloadLink = `<strong>${cvFile.name}</strong> (${Math.round(cvFile.size / 1024)}KB)<br><small style="color: #e74c3c;">Upload failed - Please email your CV to us directly</small>`;
        }
      } catch (uploadError) {
        console.error('Error uploading CV:', uploadError);
        cvDownloadLink = `<strong>${cvFile.name}</strong> (${Math.round(cvFile.size / 1024)}KB)<br><small style="color: #e74c3c;">Upload error - Please email your CV to us directly</small>`;
      }
    }

    // Step 2: Create formatted content (same style as contact form but with downloadable CV)
    const formattedContent = `
<h3>Job Application</h3>

<p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>

<p><strong>Position Applied For:</strong><br>
${vacancyPosition || 'Not specified'}</p>

<p><strong>Department:</strong><br>
${vacancyDepartment || 'Not specified'}</p>

<hr>

<p><strong>Full Name:</strong><br>
${fullName}</p>

<p><strong>Email Address:</strong><br>
${email}</p>

<p><strong>CV/Resume:</strong><br>
${cvDownloadLink}</p>

<p><strong>Cover Letter:</strong><br>
${message.replace(/\n/g, '<br>')}</p>

<hr>

<p><em>This application was submitted through the website job application form.</em></p>
    `.trim();

    // Step 3: Create the application post (exactly like contact form)
    const postData = {
      title: fullName, // Just the name as title (same as contact form)
      content: formattedContent,
      status: 'publish'
    };

    console.log('Creating application with formatted content and CV link...');

    const response = await fetch(`${wordpressUrl}/wp-json/wp/v2/application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(postData)
    });

    const responseText = await response.text();
    console.log('WordPress response status:', response.status);

    if (!response.ok) {
      let errorMessage = 'Failed to create application';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorData.code || errorMessage;
      } catch (e) {
        errorMessage = responseText || errorMessage;
      }

      console.error('WordPress API error:', errorMessage);
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to submit application: ${errorMessage}` 
        },
        { status: response.status }
      );
    }

    const result = JSON.parse(responseText);
    console.log('Successfully created application with ID:', result.id);

    // Step 4: Verify the post was created by fetching it back (same as contact form)
    try {
      const verifyResponse = await fetch(`${wordpressUrl}/wp-json/wp/v2/application/${result.id}`, {
        method: 'GET',
        headers: {
          'Authorization': authHeader
        }
      });
      
      if (verifyResponse.ok) {
        const verifyResult = await verifyResponse.json();
        console.log('✅ Verified application exists:', verifyResult.id, verifyResult.title?.rendered);
        
        return NextResponse.json({
          success: true,
          message: 'Job application submitted successfully!',
          data: {
            id: verifyResult.id,
            title: verifyResult.title?.rendered || verifyResult.title,
            content: verifyResult.content?.rendered || verifyResult.content,
            link: verifyResult.link,
            submittedData: {
              fullName,
              email,
              message,
              cvUploaded: cvFile ? true : false,
              position: vacancyPosition,
              submittedAt: new Date().toISOString()
            }
          }
        });
      }
    } catch (verifyError) {
      console.log('Could not verify application creation:', verifyError);
    }

    // Fallback success response (same as contact form)
    return NextResponse.json({
      success: true,
      message: 'Job application submitted successfully!',
      data: {
        id: result.id,
        title: result.title?.rendered || result.title,
        submittedData: {
          fullName,
          email,
          message,
          cvUploaded: cvFile ? true : false,
          position: vacancyPosition,
          submittedAt: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Job application submission error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}