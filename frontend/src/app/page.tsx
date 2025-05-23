"use client"
import Link from "next/link";
import "@/homeAuthCSS/Home.css"
export default  function Home() {
  return (
            <div className="home-container">
                <header className="home-header">
                    <h1>Welcome to ChatApp</h1>
                    <p>Connect with friends and colleagues in real-time</p>
                </header>

                <div className="home-content">
                    <div className="features">
                        <div className="feature-card">
                            <h3>Real-time Messaging</h3>
                            <p>Chat instantly with anyone, anywhere</p>
                        </div>

                        <div className="feature-card">
                            <h3>Multiple Rooms</h3>
                            <p>Join different chat rooms based on your interests</p>
                        </div>

                        <div className="feature-card">
                            <h3>Secure</h3>
                            <p>Your conversations are encrypted and private</p>
                        </div>
                    </div>

                    <div className="home-actions">
                        <Link href="/login" className="action-button">Login</Link>
                        <Link href="/register" className="action-button secondary">Register</Link>
                    </div>
                </div>
            </div>
        );
    };






