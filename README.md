# Core-UI Primitives Component Library

A React 19 + TypeScript component library built with Storybook and SCSS Modules. 

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Getting Started](#getting-started)
3. [Architecture Notes](#architecture-notes)
4. [Component Overview](#component-overview)
5. [Creating a New Component](#creating-a-new-component)
6. [Testing](#testing)

## Tech Stack
- **React**: ^19.2.8
- **TypeScript**: ^5.6.2
- **Build Tool**: Vite 8
- **Styling**: SCSS Modules
- **Development Environment**: Storybook 10.5.1
- **Testing**: Vitest + Playwright

## Getting Started

First, install all dependencies:
\`\`\`bash
npm install
\`\`\`

To start the Storybook development server:
\`\`\`bash
npm run storybook
\`\`\`

To build the static Storybook site:
\`\`\`bash
npm run build-storybook
\`\`\`

To build the library:
\`\`\`bash
npm run build
\`\`\`

## Architecture Notes
The primitive components in \`src/stories/primitives-components/\` were originally extracted from an internal \`@Core-UI\` design system repository. Because the underlying npm packages (\`@Core-UI/react-icons\`, \`@Core-UI/utils\`) are not available in this standalone repo, they have been **mocked/stubbed** in the \`src/stories/Core-UI/\` directory.

- **Styles**: Shared SCSS variables and typography mixins live in \`src/stories/Core-UI/styles/\`.
- **Primitives**: Base elements like \`Text\`, \`Icon\`, \`Block\`, and \`Popper\` have been implemented as local fallbacks so the UI components compile and render.
- **Icons**: \`react-icons.tsx\` exports SVG glyphs used internally.

## Component Overview
The library includes 15 primitive components. You can view all their variants interactively in Storybook.

- **Accordion**: Collapsible content panels
- **Avatar**: User profile images and initials
- **BackToTop**: Floating button to scroll to top
- **Button**: Standard interactive buttons
- **Checkbox**: Form check inputs
- **Chip**: Small interactive tags/labels
- **Divider**: Horizontal/vertical separators
- **Link**: Anchors and navigation links
- **ProgressBar**: Visual progress indicators
- **QuantityStepper**: Number input with +/- controls
- **Radio**: Form radio inputs
- **Slider**: Range selection
- **Spacer**: Layout whitespace blocks
- **Toast**: Floating notifications
- **Tooltip**: Hover popovers

## Creating a New Component

To scaffold a new component, follow this structure:

1. Create a folder in \`src/stories/primitives-components/your-component\`
2. Add \`your-component.tsx\` (Component logic)
3. Add \`your-component.module.scss\` (Styles)
4. Add \`index.ts\` (Exports)
5. Add \`your-component.stories.tsx\` (Storybook docs)

Example \`your-component.stories.tsx\`:
\`\`\`tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './index';

const meta: Meta<typeof YourComponent> = {
  title: 'Primitives/YourComponent',
  component: YourComponent,
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {
  args: {
    id: 'my-comp-1',
    children: 'Hello World'
  }
};
\`\`\`

## Testing
This repository is configured with Vitest and Playwright. 
To run unit tests:
\`\`\`bash
npm run test
\`\`\`
