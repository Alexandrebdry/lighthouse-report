import './main.css'

export default function App({ Component, pageProps: {...pageProps} }) {

    return (
        <>
            <Component {...pageProps} />
        </>
    )
}