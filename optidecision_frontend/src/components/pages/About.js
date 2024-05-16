import React from 'react';

function About() {
    console.log("About is being rendered");

    return (
        <div className="content-container px-6 py-12 bg-[#FFF8DC] text-[#6C0345]">
            <h1 className="text-4xl font-bold text-center mb-8 text-[#6C0345]">About OptiDecision</h1>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-3 text-[#DC6B19]">Our Mission</h2>
                <p className="text-lg leading-relaxed">
                    At OptiDecision, our mission is to empower individuals and organizations to make better, more informed decisions. We understand the complexity of decision-making processes, especially when multiple criteria are involved. Our goal is to simplify these processes with our innovative tool, combining proven methodologies with user-friendly technology.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-3 text-[#DC6B19]">Our Story</h2>
                <p className="text-lg leading-relaxed">
                    Founded in [Year], OptiDecision was born out of a desire to solve a common problem: decision paralysis. Our founders, [Founder Names], experienced firsthand the challenges of making optimal decisions in both personal and professional settings. Frustrated by the lack of effective tools, they set out to create a solution that would not only streamline decision-making but also ensure the outcomes were as objective and beneficial as possible.
                </p>
                <p className="mt-4 text-lg leading-relaxed">
                    With backgrounds in [Relevant Backgrounds, e.g., data analysis, software development, business strategy], our team has developed OptiDecision to utilize the Analytic Hierarchy Process (AHP) and the Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS). These methodologies provide a solid foundation for evaluating complex scenarios and identifying clear paths forward.
                </p>
            </section>

            <div className="text-center">
                <button className="bg-[#DC6B19] text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-[#F7C566] hover:text-[#6C0345]">
                    Learn More
                </button>
            </div>
        </div>
    );
}

export default About;
