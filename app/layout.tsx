import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Свой ритм — личный журнал',description:'Тело, работа и состояние в одном личном журнале.',icons:{icon:'./favicon.svg?v=3',shortcut:'./favicon.svg?v=3'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ru"><body>{children}</body></html>}
