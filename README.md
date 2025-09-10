# Wiggs Law Website

A Next.js website for the Law Offices of Geoff Wiggs, featuring expert legal counsel in bankruptcy, estate planning, probate, and business formation.

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Tailwind CSS**: Modern utility-first CSS framework for rapid development
- **Contact Form**: Interactive contact form for client inquiries
- **Service Showcase**: Detailed information about legal services
- **Client Reviews**: Yelp reviews section highlighting client satisfaction
- **Professional Layout**: Clean, professional design matching the reference website
- **Image Support**: Public folder structure for easy image management

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Build for Production

To create a production build:

```bash
npm run build
npm start
```

## Project Structure

```
wiggslaw/
├── app/
│   ├── globals.css      # Tailwind CSS directives and custom styles
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page component
├── public/
│   └── images/          # Image assets
│       ├── logo/        # Logo and branding images
│       ├── hero/        # Hero section images
│       ├── services/    # Service-related images
│       ├── team/        # Team member photos
│       └── testimonials/# Client testimonial images
├── package.json         # Dependencies and scripts
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer
- **Responsive Design**: Mobile-first approach

## Tailwind CSS Features

The website uses custom Tailwind CSS configuration with:

- **Custom Colors**: Wiggs Law brand colors (blue, gold, gray variants)
- **Custom Components**: Reusable button and form styles
- **Responsive Utilities**: Mobile-first responsive design
- **Custom Shadows**: Professional card and header shadows

## Image Management

### Adding Images

1. Place images in the appropriate folder under `public/images/`
2. Use Next.js `Image` component for optimization:
   ```tsx
   import Image from 'next/image'
   
   <Image
     src="/images/logo/logo-primary.png"
     alt="Wiggs Law Logo"
     width={200}
     height={80}
   />
   ```

### Image Guidelines

- Use optimized formats (WebP, PNG, JPG)
- Keep file sizes under 500KB for web performance
- Use descriptive filenames
- Maintain consistent aspect ratios
- Include alt text for accessibility

## Customization

The website can be easily customized by:

- Modifying the content in `app/page.tsx`
- Updating Tailwind classes for styling
- Adding new components in the `app` directory
- Updating contact information and business details
- Adding new images to the `public/images/` folder

## Contact Information

- **Phone**: (650) 577-5952
- **Fax**: (650) 577-5953
- **Email**: information@wiggslaw.com
- **Address**: 1900 S. Norfolk Street, Suite 350, San Mateo, California 94403

## License

This project is licensed under the ISC License.
