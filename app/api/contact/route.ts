import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, message } = await request.json();

    // Validate input
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

    // Create formatted content with all the contact information
    const formattedContent = `
<h3>Contact Form Submission</h3>

<p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>

<hr>

<p><strong>Full Name:</strong><br>
${fullName}</p>

<p><strong>Email Address:</strong><br>
${email}</p>

<p><strong>Message:</strong><br>
${message.replace(/\n/g, '<br>')}</p>

<hr>

<p><em>This inquiry was submitted through the website contact form.</em></p>
    `.trim();

    // Create the inquiry post using REST API (simpler and more reliable)
    const postData = {
      title: fullName, // Just the name as title (like the working examples)
      content: formattedContent,
      status: 'publish'
    };

    console.log('Creating inquiry with formatted content...');

    const response = await fetch(`${wordpressUrl}/wp-json/wp/v2/inquiry`, {
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
      let errorMessage = 'Failed to create inquiry';
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
          error: `Failed to submit contact form: ${errorMessage}` 
        },
        { status: response.status }
      );
    }

    const result = JSON.parse(responseText);
    console.log('Successfully created inquiry with ID:', result.id);

    // Verify the post was created by fetching it back
    try {
      const verifyResponse = await fetch(`${wordpressUrl}/wp-json/wp/v2/inquiry/${result.id}`, {
        method: 'GET',
        headers: {
          'Authorization': authHeader
        }
      });
      
      if (verifyResponse.ok) {
        const verifyResult = await verifyResponse.json();
        console.log('✅ Verified inquiry exists:', verifyResult.id, verifyResult.title?.rendered);
        
        return NextResponse.json({
          success: true,
          message: 'Contact form submitted successfully!',
          data: {
            id: verifyResult.id,
            title: verifyResult.title?.rendered || verifyResult.title,
            content: verifyResult.content?.rendered || verifyResult.content,
            link: verifyResult.link,
            submittedData: {
              fullName,
              email,
              message,
              submittedAt: new Date().toISOString()
            }
          }
        });
      }
    } catch (verifyError) {
      console.log('Could not verify inquiry creation:', verifyError);
    }

    // Fallback success response
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully!',
      data: {
        id: result.id,
        title: result.title?.rendered || result.title,
        submittedData: {
          fullName,
          email,
          message,
          submittedAt: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}