# Vercel Speed Insights Integration Guide

This document provides instructions on how Vercel Speed Insights has been integrated into this NestJS application.

## Overview

Vercel Speed Insights helps you track and understand your application's performance metrics. This integration includes the `@vercel/speed-insights` package to automatically collect and send performance data to Vercel.

## Prerequisites

Before using Speed Insights, ensure you have:

- A Vercel account ([sign up for free](https://vercel.com/signup))
- A Vercel project ([create a new project](https://vercel.com/new))
- The Vercel CLI installed

To install the Vercel CLI:

```bash
# Using npm
npm i vercel

# Using pnpm
pnpm i vercel

# Using yarn
yarn i vercel

# Using bun
bun i vercel
```

## Installation

The `@vercel/speed-insights` package has been added to the project dependencies. To install it:

```bash
npm install
# or
pnpm install
# or
yarn install
# or
bun install
```

## Integration Details

### What's Been Added

1. **Speed Insights Module** (`src/modules/speed-insights/`)
   - `speed-insights.module.ts` - NestJS module that provides the Speed Insights service
   - `speed-insights.service.ts` - Service that initializes Speed Insights when the application starts

2. **Updated App Module** (`src/app.module.ts`)
   - The SpeedInsightsModule has been imported, ensuring Speed Insights initializes with the application

3. **Dependencies** (`package.json`)
   - Added `@vercel/speed-insights` package

### How It Works

The SpeedInsightsService uses the `OnModuleInit` lifecycle hook to initialize Speed Insights when the NestJS application starts. This automatically sets up performance tracking for your application.

The initialization is wrapped in error handling to ensure that if Speed Insights fails to initialize, the application continues to function normally.

## Enabling Speed Insights on Vercel

To enable Speed Insights for your project:

1. Go to your [Vercel dashboard](/dashboard)
2. Select your project
3. Click the **Speed Insights** tab
4. Click the **Enable** button in the dialog

**Note:** Enabling Speed Insights will add new routes (scoped at `/_vercel/speed-insights/*`) after your next deployment.

## Deployment

Deploy your application to Vercel:

```bash
vercel deploy
```

Alternatively, connect your project's git repository to enable automatic deployments:
- Push to your repository
- Vercel will automatically deploy your latest changes

Once deployed, Speed Insights will begin collecting performance data.

## Viewing Your Data

After deployment and once users have visited your site:

1. Go to your [Vercel dashboard](/dashboard)
2. Select your project
3. Click the **Speed Insights** tab
4. After a few days of visitor traffic, you'll be able to explore your metrics

For more information on interpreting metrics, see [Using Speed Insights](/docs/speed-insights/using-speed-insights).

## Privacy and Compliance

Vercel Speed Insights complies with privacy and data standards. For more details, see:
- [Privacy Policy](/docs/speed-insights/privacy-policy)

## Available Metrics

Speed Insights tracks the following metrics:
- **Core Web Vitals** - Including LCP, FID, and CLS
- **Performance Metrics** - Page load time, time to first byte, etc.
- **Network Information** - Connection type, effective type, etc.
- **Device Information** - Device type, user agent, etc.

See [Metrics Documentation](/docs/speed-insights/metrics) for complete details.

## Next Steps

- [Learn more about the `@vercel/speed-insights` package](/docs/speed-insights/package)
- [Explore pricing](/docs/speed-insights/limits-and-pricing)
- [View troubleshooting guide](/docs/speed-insights/troubleshooting)

## Customization

If you need to customize Speed Insights behavior in the future, you can modify the `SpeedInsightsService` in `src/modules/speed-insights/speed-insights.service.ts`.

For advanced configuration options, refer to the [Speed Insights Package Documentation](/docs/speed-insights/package).
