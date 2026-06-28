const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-left">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>

      <p className="text-xl font-semibold mb-4">
        SleepSage: Your Path to Better Sleep, Simplified.
      </p>

      <p className="mb-4">
        SleepSage is a free recommendation tool for over-the-counter sleep supplements. If you're
        struggling with sleep, we provide science-based recommendations for natural,
        over-the-counter sleep aids, customized to your specific sleep complaints and pain points.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">How it works:</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          <strong>You tell us about your sleep:</strong> Through a straightforward questionnaire, we
          gather information about your sleep habits, challenges, and preferences.
        </li>
        <li>
          <strong>We analyze the data:</strong> Using a methodology based on available research, we
          identify potential supplement ingredients that align with your needs.
        </li>
        <li>
          <strong>You get personalized recommendations:</strong> We provide suggestions for
          over-the-counter sleep supplements, along with information about their potential benefits
          and considerations.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">What we offer:</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Free, personalized supplement recommendations</li>
        <li>Information on common sleep supplement ingredients</li>
        <li>Resources to help you understand sleep and sleep supplements</li>
        <li>A community channel for communication</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Important Considerations:</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          SleepSage is a recommendation tool, not a medical service. Always consult with a
          healthcare professional before starting any new supplement.
        </li>
        <li>We prioritize user privacy.</li>
        <li>We moderate our community channel.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Goal:</h2>
      <p>
        To empower individuals to make informed decisions about their sleep by providing clear,
        accessible, and personalized supplement recommendations.
      </p>
    </div>
  );
};

export { About };
