# Novacrust Labs - Frontend Assessment

A crypto checkout widget built with Next.js 15 and TypeScript. Think Stripe Checkout, but for crypto-to-cash conversions.

## What This Is

This is an embeddable widget that lets users convert crypto to cash. I built it as part of Novacrust's frontend assessment. The main focus was on writing clean code, making it responsive, and handling forms properly.

### What's Inside

**Main Widget (`/`)**

- Convert crypto to cash
- Pick your currency (ETH, BTC, USDT)
- Choose your wallet (Metamask, Rainbow, WalletConnect)
- Select payment method
- Form validation that actually works

**Confirmation Page (`/confirmation`)**

- Shows your transaction confirmation
- Copy wallet address
- Get back to the main page

## Tech Stuff

Built with Next.js 15, TypeScript, and TailwindCSS. Using shadcn/ui for components because I like having full control over the code. Form handling with React Hook Form + Zod for validation. Added Redux Toolkit and React Query for state management.

Full list:

- Next.js 15.3.8 (App Router)
- TypeScript 5
- TailwindCSS 3.4
- Outfit font from Google Fonts
- shadcn/ui + Radix UI
- Redux Toolkit
- TanStack Query
- React Hook Form
- Zod
- Lucide icons

## Running It

You need Node.js 18+ and yarn (or npm if you prefer).

```bash
git clone https://github.com/berry-san/novacrust-assessment.git
cd novacrust-assessment
yarn
yarn dev
```

Go to [http://localhost:3000](http://localhost:3000)

For production:

```bash
yarn build
yarn start
```

## How It's Organized

```
novacrust-labs/
├── app/                    # Next.js app directory
│   ├── layout.tsx
│   ├── page.tsx
│   ├── confirmation/
│   ├── apiService/
│   ├── provider/
│   ├── queryHandler/
│   └── utils/
├── components/
│   ├── ui/                 # shadcn components
│   └── widget/             # custom widget components
├── lib/
│   ├── constants/          # currencies, wallets, etc
│   └── validations/        # zod schemas
├── store/
├── hooks/
└── types/
```

## Scripts

```bash
yarn dev              # dev server
yarn build            # production build
yarn start            # run production
yarn lint             # check code
yarn lint-fix         # fix lint issues
yarn format           # format with prettier
yarn check-types      # typescript check
yarn test-all         # run everything
```

Set up Husky hooks with `yarn prepare`. Every commit gets checked for formatting, linting, types, and builds.

## Design Choices

**Why shadcn/ui?**
I wanted full control over the component code. Yeah, it's more setup than just importing from a package, but you own everything.

**State management**
Using Redux Toolkit for global state and React Query for server stuff. Keeps things separate and easier to reason about.

**Forms**
React Hook Form with Zod. It's fast (uncontrolled components) and type-safe. No guessing what validation errors you'll get.

**Styling**
TailwindCSS because utility classes are just faster to work with. Added custom design tokens for the brand colors.

## User Flow

Pretty straightforward:

1. Land on the main page
2. Pick crypto to cash
3. Enter amount, select currencies
4. Choose your wallet
5. Pick payment method
6. Submit
7. See confirmation page with wallet address
8. Go back if you want

## Notes

The conversion form has real validation - it'll catch empty fields, invalid amounts, and missing selections. Added some "coming soon" placeholders for features that aren't built yet (like the bank account and phone number tabs).

Responsive works on mobile, tablet, and desktop. Used proper semantic HTML and ARIA labels where needed.

Check the [Figma design](https://www.figma.com/design/FRfbMHys4JINX4V9qBxgbf/Frontend-Assessment?node-id=0-1) if you want to see the original specs.
