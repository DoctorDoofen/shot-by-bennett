import "./LandingPage.css"
import FooterCard from "./FooterCard"
import { useState, useEffect } from "react"

function LandingPage() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <>
            <div className="landing-title">
                <h1>Shot by Bennett</h1>
            </div>
            <main id="landing-page">
                {!isLoaded
                    ? <h3>Loading ...</h3>
                    : <>
                        <footer id="landing-footer">
                            <FooterCard title="">
                                <div>
                                </div>
                            </FooterCard>
                        </footer>
                    </>
                }
            </main>
        </>
    )
}

export default LandingPage
