import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Cores personalizadas para o Sombras do Brasil
				'blood-red': '#ca0000',
				'aged-white': '#eee8d5',
				'sepia': '#704214',
				'graphite': '#333333',
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'sans-serif'],
				'lora': ['Lora', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '0.7' },
					'50%': { opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'ritual-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(202,0,0,0.3), 0 0 10px rgba(202,0,0,0.2), 0 0 15px rgba(202,0,0,0.1)'
					},
					'50%': { 
						boxShadow: '0 0 10px rgba(202,0,0,0.5), 0 0 20px rgba(202,0,0,0.3), 0 0 30px rgba(202,0,0,0.2)'
					}
				},
				'mystical-fade': {
					'0%': { opacity: '0', filter: 'blur(3px)' },
					'100%': { opacity: '1', filter: 'blur(0px)' }
				},
				'mist-flow': {
					'0%': { transform: 'translateX(0) translateY(0)' },
					'50%': { transform: 'translateX(30px) translateY(-15px)' },
					'100%': { transform: 'translateX(0) translateY(0)' }
				},
				'textShadow': {
					'0%': { 
						textShadow: '0.25px 0 0 rgba(255,0,0,0.75), -0.25px 0 0 rgba(0,255,0,0.75), 0 0 0 rgba(0,0,255,0.75)'
					},
					'14%': { 
						textShadow: '0.25px 0 0 rgba(255,0,0,0.75), -0.25px 0 0 rgba(0,255,0,0.75), 0 0 0 rgba(0,0,255,0.75)'
					},
					'15%': { 
						textShadow: '-0.5px 0 0 rgba(255,0,0,0.75), 0.25px 0 0 rgba(0,255,0,0.75), 0 0 0 rgba(0,0,255,0.75)'
					},
					'49%': { 
						textShadow: '-0.5px 0 0 rgba(255,0,0,0.75), 0.25px 0 0 rgba(0,255,0,0.75), 0 0 0 rgba(0,0,255,0.75)'
					},
					'50%': { 
						textShadow: '0.25px 0 0 rgba(255,0,0,0.75), 0.25px 0 0 rgba(0,255,0,0.75), 0 0 0 rgba(0,0,255,0.75)'
					},
					'99%': { 
						textShadow: '0.25px 0 0 rgba(255,0,0,0.75), 0.25px 0 0 rgba(0,255,0,0.75), 0 0 0 rgba(0,0,255,0.75)'
					},
					'100%': { 
						textShadow: '-0.25px 0 0 rgba(255,0,0,0.75), -0.25px 0 0 rgba(0,255,0,0.75), 0 0 0 rgba(0,0,255,0.75)'
					}
				},
				'flicker': {
					'0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
						opacity: '0.99',
						filter: 'drop-shadow(0 0 1px rgba(202,0,0,0.5)) drop-shadow(0 0 4px rgba(202,0,0,0.2))'
					},
					'20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
						opacity: '0.4',
						filter: 'none'
					}
				},
				'blood-drip': {
					'0%': { transform: 'translateY(0)', opacity: '0' },
					'50%': { transform: 'translateY(10px)', opacity: '1' },
					'100%': { transform: 'translateY(20px)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1s ease-out forwards',
				'pulse-soft': 'pulse-soft 3s infinite ease-in-out',
				'float': 'float 6s infinite ease-in-out',
				'ritual-glow': 'ritual-glow 4s infinite ease-in-out',
				'mystical-fade': 'mystical-fade 1.5s ease-out forwards',
				'mist-flow': 'mist-flow 15s infinite ease-in-out',
				'text-glitch': 'textShadow 1.6s infinite',
				'flicker': 'flicker 4s linear infinite',
				'blood-drip': 'blood-drip 4s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
