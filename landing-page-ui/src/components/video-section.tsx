const VideoSection = () => {
  return (
    <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-y-10 md:gap-y-20 gap-x-20 md:gap-x-40">
      <div className="w-full text-center">
        <h3 className="text-4xl">&quot;Sleep Is Your Superpower&quot;</h3>
        <p className="text-center text-lg text-default-purple pt-5 md:pt-10">
          Sleep is your life-support system and Mother Nature&apos;s best effort yet at immortality,
          says sleep scientist Matt Walker. In this deep dive into the science of slumber, Walker
          shares the wonderfully good things that happen when you get sleep -- and the alarmingly
          bad things that happen when you don&apos;t, for both your brain and body.
        </p>
      </div>

      <div className="w-full border-4 border-black rounded-lg">
        <iframe
          className="w-full"
          height="315"
          src="https://www.youtube.com/embed/5MuIMqhT8DM?si=zJd-m5E_RoTYI-nH"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export { VideoSection };
