'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, FileText, Download } from 'lucide-react';
import TopSearch from '../../../components/TopSearch';

// Registration documents and information data
const registrationData = [
    {
        id: 1,
        title: "संस्थाको दर्ता प्रमाणपत्र - दर्ता नं. ८/५०/५१",
        excerpt: "ग्रामीण नारी उत्थान संघको आधिकारिक दर्ता प्रमाणपत्र जुन सामाजिक कल्याण परिषद्बाट जारी गरिएको हो। यो प्रमाणपत्रले संस्थाको कानुनी मान्यता प्रदान गर्छ।",
        image: "https://rwua.com.np/wp-content/uploads/2021/10/1.jpg",
        category: "Registration Certificate",
        documentType: "PDF",
        date: "२०५१ साल"
    },
    {
        id: 2,
        title: "संस्थाको संविधान र नियमावली",
        excerpt: "ग्रामीण नारी उत्थान संघको संविधान र आन्तरिक नियमावली जसमा संस्थाको उद्देश्य, कार्यक्षेत्र र संगठनात्मक संरचनाको विस्तृत विवरण छ।",
        image: "https://rwua.com.np/wp-content/uploads/2025/02/shared-image.jpeg",
        category: "Constitution",
        documentType: "PDF",
        date: "२०५१ साल"
    },
    {
        id: 3,
        title: "सामाजिक कल्याण परिषद्को सम्बद्धता प्रमाणपत्र",
        excerpt: "राष्ट्रिय सामाजिक कल्याण परिषद्बाट प्राप्त सम्बद्धता प्रमाणपत्र जसले संस्थालाई सामाजिक कार्यहरू सञ्चालन गर्न अधिकार प्रदान गर्छ।",
        image: "https://rwua.com.np/wp-content/uploads/2021/04/11.jpg",
        category: "Affiliation Certificate",
        documentType: "PDF",
        date: "२०५२ साल"
    },
    {
        id: 4,
        title: "PAN दर्ता प्रमाणपत्र",
        excerpt: "आन्तरिक राजस्व कार्यालयबाट जारी स्थायी लेखा नम्बर (PAN) दर्ता प्रमाणपत्र जसले संस्थाको आर्थिक कारोबारको कानुनी आधार प्रदान गर्छ।",
        image: "https://rwua.com.np/wp-content/uploads/2020/01/13.jpg",
        category: "PAN Certificate",
        documentType: "PDF",
        date: "२०५३ साल"
    },
    {
        id: 5,
        title: "वार्षिक प्रगति प्रतिवेदन - २०२४",
        excerpt: "संस्थाको वार्षिक कार्यक्रम र उपलब्धिहरूको विस्तृत प्रतिवेदन जसमा आर्थिक विवरण र भविष्यका योजनाहरू समावेश छन्।",
        image: "https://rwua.com.np/wp-content/uploads/2025/12/blimket-780x470-1.png",
        category: "Annual Report",
        documentType: "PDF",
        date: "२०२४ साल"
    },
    {
        id: 6,
        title: "संस्थाको कार्यक्षेत्र र उद्देश्यहरू",
        excerpt: "ग्रामीण नारी उत्थान संघको मुख्य कार्यक्षेत्रहरू र उद्देश्यहरूको विस्तृत विवरण जसमा महिला सशक्तिकरण र सामुदायिक विकासका कार्यहरू समावेश छन्।",
        image: "https://rwua.com.np/wp-content/uploads/2021/10/1.jpg",
        category: "Objectives",
        documentType: "PDF",
        date: "२०५१ साल"
    }
];

export default function RegistrationPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter registration documents based on search query
    const filteredDocuments = useMemo(() => {
        if (!searchQuery.trim()) {
            return registrationData;
        }

        const query = searchQuery.toLowerCase();
        return registrationData.filter(doc =>
            doc.title.toLowerCase().includes(query) ||
            doc.excerpt.toLowerCase().includes(query) ||
            doc.category.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
            {/* Breadcrumb Section */}
            <section className="py-4 px-0 pt-[15px]" style={{
                backgroundColor: '#ffffff',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-end">
                        <nav className="flex items-center text-sm text-gray-600 font-sans">
                            <Link href="/" className="hover:text-purple-800 flex items-center">
                                <Home className="w-4 h-4 mr-1" />
                                मुख्य पृष्ठ
                            </Link>
                            <span className="mx-2">/</span>
                            <Link href="/about" className="hover:text-purple-800">
                                About
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-600 font-medium">दर्ता नं. ८/५०/५१</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <div className="max-w-screen-lg mx-auto px-4">
                {/* Page Header */}
                <div className="text-center py-12">
                    <div className="flex items-center justify-center mb-4">
                        <FileText className="w-12 h-12 text-green-600 mr-4" />
                        <h1 className="text-4xl font-bold text-gray-800">दर्ता नं. ८/५०/५१</h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        ग्रामीण नारी उत्थान संघको संस्थागत दर्ता विवरण र आधिकारिक कागजातहरू
                    </p>
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-green-800 font-semibold">आधिकारिक दर्ता नम्बर</p>
                        <p className="text-2xl font-bold text-green-900">८/५०/५१</p>
                        <p className="text-sm text-green-700">सामाजिक कल्याण परिषद्, नेपाल सरकार</p>
                    </div>
                </div>

                {/* Search Section */}
                <TopSearch onSearch={setSearchQuery} />

                <main className="mt-12">
                    {/* Show search results count */}
                    {searchQuery && (
                        <div className="mb-6 text-gray-600">
                            <p className="text-sm">
                                Showing {filteredDocuments.length} result{filteredDocuments.length !== 1 ? 's' : ''} for "{searchQuery}"
                            </p>
                        </div>
                    )}

                    {/* No results message */}
                    {searchQuery && filteredDocuments.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No documents found for "{searchQuery}"</p>
                            <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
                        </div>
                    )}

                    {/* Registration Documents Grid - Using Latest News Card Design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDocuments.map((doc) => (
                            <div key={doc.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                                {/* Image Section - Smaller */}
                                <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                                    <Image
                                        src={doc.image}
                                        alt={doc.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* Category Badge */}
                                    <div className="absolute top-2 left-2">
                                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                                            {doc.category}
                                        </span>
                                    </div>

                                    {/* Document Type Badge */}
                                    <div className="absolute top-2 right-2">
                                        <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium flex items-center">
                                            <FileText className="w-3 h-3 mr-1" />
                                            {doc.documentType}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section - More compact */}
                                <div className="p-3">
                                    {/* Header */}
                                    <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
                                        {doc.title}
                                    </h3>

                                    {/* Description - Much shorter */}
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                                        {doc.excerpt.length > 80 ? doc.excerpt.substring(0, 80) + '...' : doc.excerpt}
                                    </p>

                                    {/* Footer - Inline Read More */}
                                    <div className="flex justify-between items-center">
                                        {/* Date */}
                                        <div className="flex items-center text-xs text-gray-500">
                                            <span>{doc.date}</span>
                                        </div>

                                        {/* Download Button - Better design */}
                                        <Link
                                            href="/news"
                                            className="inline-flex items-center text-blue-600 hover:text-white text-sm font-medium transition-all duration-300 hover:bg-blue-600 px-3 py-1.5 rounded-full border border-blue-200 hover:border-blue-600 group hover:shadow-md cursor-pointer"
                                        >
                                            <Download className="w-3 h-3 mr-1" />
                                            <span>Download</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Important Notice */}
                    <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-start">
                            <FileText className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">महत्वपूर्ण जानकारी</h3>
                                <p className="text-blue-800 mb-3">
                                    ग्रामीण नारी उत्थान संघ नेपाल सरकारको सामाजिक कल्याण परिषद्मा दर्ता नम्बर ८/५०/५१ मा दर्ता भएको एक गैर-सरकारी संस्था हो।
                                </p>
                                <ul className="text-blue-700 text-sm space-y-1">
                                    <li>• दर्ता मिति: २०५१ साल</li>
                                    <li>• दर्ता कार्यालय: सामाजिक कल्याण परिषद्, नेपाल सरकार</li>
                                    <li>• मुख्य कार्यक्षेत्र: महिला सशक्तिकरण र सामुदायिक विकास</li>
                                    <li>• कार्य क्षेत्र: सर्लाही जिल्ला र आसपासका क्षेत्रहरू</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact for Documents */}
                    <div className="text-center mt-12">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">कागजातहरूको लागि सम्पर्क गर्नुहोस्</h3>
                            <p className="text-gray-600 mb-4">
                                यदि तपाईंलाई कुनै विशेष कागजात चाहिन्छ भने कृपया हामीलाई सम्पर्क गर्नुहोस्।
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors duration-200 group bg-transparent border-2 border-blue-600 hover:border-blue-800 rounded-lg py-3 px-6"
                            >
                                Contact Us
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>

            <div className="pb-24"></div>
        </div>
    );
}