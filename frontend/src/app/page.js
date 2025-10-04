import BloomingMap from "./BloomingMap";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-row justify-center">
      <div id="side-bar" className="justify-center w-10 bg-primary">
        <img src="./bloom.svg" className="h-10" />
      </div>
      {/* <BloomingMap></BloomingMap> */}
      <div id="navigator" className="absolute flex my-[15px] z-1">
        <div>
          <img src="./flower.svg" className="absolute my-[5px] mx-[25px] w-10 h-[20px]"></img>
          <button
            id="species"
            className="h-[30px] mx-[20px] px-[40px] w-40 bg-primary font-bold text-white text-left rounded-3xl"
          >
            Species
          </button>
        </div>
        <div>
          <img src="./comparison.svg" className="absolute my-[5px] mx-[25px] w-10 h-[20px]"></img>
          <button
            id="locations"
            className="h-[30px] mx-[20px] px-[40px] w-40 bg-primary font-bold text-white text-left rounded-3xl"
          >
            Comparison
          </button>
        </div>
      </div>
      <BloomingMap></BloomingMap>
    </main>
  );
}
