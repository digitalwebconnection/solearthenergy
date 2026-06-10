export default function Brands() {
  const brands = [
    {
      name: "Fronius",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmfEQXsznd91urABND-t82WeVJzthZrT4MHA&s",
    },
    {
      name: "Sungrow",
      logo: "https://www.vicoexport.com/wp-content/uploads/2024/01/Sungrow-Logo-vico-export-solar-energy.png",
    },
    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    },
    {
      name: "Jinko Solar",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/74/Jinko_Solar_logo.svg",
    },
    {
      name: "Trina Solar",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTufVMIzZ1jVeRdJE4404HLb85JphB4ykga-A&s",
    },
    {
      name: "Q CELLS",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIQ6sFBdUp9Xw0PaD5WxDFkFfs8Q5lv3Qo4g&s",
    },
    {
      name: "Enphase",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4lK_OJm9GRFCCIes0EaF72ruPODdAJg0T7A&s",
    },
    {
      name: "Sigenergy",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnDRLrEQWWVDnG5MSE9mYtVIH5dTVbQaTDnQ&s",
    },

  ];

  const marqueeItems = [...brands, ...brands];

  return (
    <section className="py-8 bg-white  overflow-hidden">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }

          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto mb-8 px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[4px] text-[#1870B8]">
          Trusted Solar Brands We Install
        </p>
      </div>

      <div className="relative overflow-hidden">

        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent z-10"></div>

        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent z-10"></div>

        <div className="animate-marquee gap-20 px-10">

          {marqueeItems.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[120px] h-20    transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-12 max-w-[140px] object-contain"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}