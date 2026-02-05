import React, { useState, useEffect } from 'react';
import { carouselImages } from '../constants/images';

const Carousel = () => {
    // 1. Array of Images (Imported from centralized file)
    const images = carouselImages;

    // 2. State to track the current image index
    const [currentIndex, setCurrentIndex] = useState(0);

    // 3. Auto-play Logic: Change slide every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 3000); // 3000ms = 3 seconds

        // Cleanup: Stop the timer if the component unmounts or user clicks manually
        // basic implementation: just clear on unmount for this simple demo
        return () => clearInterval(intervalId);
    }, [currentIndex]); // Re-run effect when index changes to reset timer (optional but good for smooth manual interaction)

    // 4. Navigation Functions
    const nextSlide = () => {
        // If at the end, go back to 0, else go to next
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        // If at the start, go to last image, else go to previous
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // 5. Simple Styles (No heavy CSS)
    const styles = {
        container: {
            width: '600px',
            margin: '20px auto',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
        },
        imageContainer: {
            position: 'relative',
            width: '100%',
            height: '400px',
            overflow: 'hidden',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        buttonValues: {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '10px'
        },
        btn: {
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
        }
    };

    return (
        <div style={styles.container}>
            <h2>Simple React Carousel</h2>

            {/* Image Area */}
            <div style={styles.imageContainer}>
                <img
                    src={images[currentIndex].url}
                    alt={images[currentIndex].alt}
                    style={styles.image}
                />
            </div>

            {/* Controls */}
            <div style={styles.buttonValues}>
                <button onClick={prevSlide} style={styles.btn}>Previous</button>
                <div style={{ alignSelf: 'center' }}>
                    {currentIndex + 1} / {images.length}
                </div>
                <button onClick={nextSlide} style={styles.btn}>Next</button>
            </div>

            <p>Auto-plays every 3 seconds</p>
        </div>
    );
};

export default Carousel;
