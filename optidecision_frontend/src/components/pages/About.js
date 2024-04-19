import React from 'react';

function About() {
    console.log("about is being rendered");

  return (

    <div className="content-container">
      <h1 className="text-4xl font-bold text-center mb-4">About OptiDecision</h1>
      
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-3">Our Mission</h2>
        <p>
          At OptiDecision, our mission is to empower individuals and organizations to make better, more informed decisions. We understand the complexity of decision-making processes, especially when multiple criteria are involved. Our goal is to simplify these processes with our innovative tool, combining proven methodologies with user-friendly technology.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-3">Our Story</h2>
        <p>
          Founded in [Year], OptiDecision was born out of a desire to solve a common problem: decision paralysis. Our founders, [Founder Names], experienced firsthand the challenges of making optimal decisions in both personal and professional settings. Frustrated by the lack of effective tools, they set out to create a solution that would not only streamline decision-making but also ensure the outcomes were as objective and beneficial as possible.
        </p>
        <p className="mt-4">
          With backgrounds in [Relevant Backgrounds, e.g., data analysis, software development, business strategy], our team has developed OptiDecision to utilize the Analytic Hierarchy Process (AHP) and the Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS). These methodologies provide a solid foundation for evaluating complex scenarios and identifying clear paths forward.
        </p>
      </section>
      
      {/* You can add more sections here as needed */}
      
    </div>
  );
}

export default About;
