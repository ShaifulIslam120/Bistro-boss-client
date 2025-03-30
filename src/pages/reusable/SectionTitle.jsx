const SectionTitle = ({ topText, mainText }) => {
    return (
      <div className="text-center my-8 max-w-[320px] mx-auto">
        <p className="text-yellow-500 italic mb-2 flex items-center justify-center">
          <span className="border-b border-dashed border-yellow-500 w-8"></span>
          <span className="mx-2">{topText}</span>
          <span className="border-b border-dashed border-yellow-500 w-8"></span>
        </p>
        <h2 className="text-3xl font-semibold uppercase">{mainText}</h2>
      </div>
    );
  };
  
  export default SectionTitle;