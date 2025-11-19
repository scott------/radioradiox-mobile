# Asset Placeholders

This folder should contain the following image assets for the RadioRadioX mobile app:

## Required Assets

### icon.png
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Description**: App icon displayed on device home screens
- **Design**: Should feature RadioRadioX branding with red (#dd3333) on black (#000000) background

### splash.png
- **Size**: 1242x2436 pixels (or larger)
- **Format**: PNG
- **Description**: Splash screen shown during app launch
- **Design**: RadioRadioX logo centered on black background

### adaptive-icon.png
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Description**: Android adaptive icon (foreground layer only)
- **Design**: RadioRadioX logo that works with various mask shapes

### favicon.png
- **Size**: 48x48 pixels (or larger)
- **Format**: PNG
- **Description**: Web favicon for browser tab
- **Design**: Simplified RadioRadioX logo

## Current Status

⚠️ **Placeholder Notice**: The current asset files are placeholders. Please replace them with actual RadioRadioX branded assets before deploying to production.

## Design Guidelines

- Primary Color: #dd3333 (Red)
- Background Color: #000000 (Black)
- Secondary Color: #f5f5f5 (Light Gray)
- Use bold, modern typography
- Maintain high contrast for visibility
- Follow platform-specific guidelines (iOS Human Interface Guidelines, Material Design)

## How to Replace

1. Create your assets following the specifications above
2. Save them in this `assets/` folder
3. Ensure filenames match exactly: `icon.png`, `splash.png`, `adaptive-icon.png`, `favicon.png`
4. Restart the Expo development server to see changes

## Tools for Asset Generation

- **Expo Asset Generator**: Built-in tool for generating all required sizes
- **Figma**: Design tool with export presets
- **Sketch**: macOS design tool
- **Adobe Photoshop**: Industry standard image editor
- **GIMP**: Free alternative to Photoshop

For more information, visit: https://docs.expo.dev/guides/app-icons/
