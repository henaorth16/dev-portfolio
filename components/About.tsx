export default function About() {
  return (
    <section className="w-full  py-16 px-6 lg:px-28">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-medium">About me</h2>

          <div className="flex items-center mt-2">
            <span className="text-s text-gray-500">2023</span>
            <div className="hr-line flex-1 h-[2px] bg-gray-500 mx-2"></div>
            <span className="text-s text-gray-500">2025</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-left max-w-xl text-2xl mx-auto text-gray-700 leading-relaxed mb-10">
          <p>
            <span className="text-center block">I’m Dawit Tesfaye From</span>{" "}
            <span className="text-right mr-24 block">
              love of visuals to career in digital design
            </span>
            <span className="text-right mr-24 block">
              I’ve grown through hands on projects
            </span>
            <span className="text-right mr-24 block">
              crafting brands and interfaces
            </span>
          </p>
        </div>

        {/* Image */}
        <div className="flex flex-col max-w-2xl mx-auto">
          <div className="w-full flex justify-center">
            <img
              src="/about-portrait.jpg" // replace with your image
              alt="profile"
              className="object-cover"
            />
          </div>
          {/* Stats */}
          <div className="grid grid-cols-4 text-center text-gray-800 py-3">
            <div>
              <h3 className="text-5xl font-semibold">3</h3>
              <p className="text-xs text-gray-500">Years of experience</p>
            </div>
            <div>
              <h3 className="text-5xl font-semibold">14+</h3>
              <p className="text-xs text-gray-500">Projects completed</p>
            </div>
            <div>
              <h3 className="text-5xl font-semibold">96%</h3>
              <p className="text-xs text-gray-500">Satisfied Client</p>
            </div>
            <div>
              <h3 className="text-5xl font-semibold">4+</h3>
              <p className="text-xs text-gray-500">Industries Served</p>
            </div>
          </div>
        </div>

        {/*progress stats */}
        <div className="my-10">
          <h1 className="text-5xl text-center p-4">My Work Process</h1>
          <p className="text-center text-lg max-w-lg mx-auto">
            Dawit is a product and UI/UX designer focused on turning complex ideas
            into simple, user centered digital products
          </p>
          <table className="w-full max-w-5xl mx-auto table-fixed mt-6 ">
            {/* no header for this table */}
            <tbody className="space-y-4 justify-between items-center">
              <tr className="border-b">
                <td className="mb-6">
                  <h3 className="text-lg">1</h3>
                </td>
                <td>
                  <h3 className="text-lg">Discover</h3>
                </td>
                <td>
                  <h3 className="text-lg">
                    faijadfahfljkdjfhiuadhf aiuhflahf auh alhfaiuhf all{" "}
                  </h3>
                </td>
              </tr>
              <tr className="border-b">
                <td>
                  <h3 className="text-lg">1</h3>
                </td>
                <td>
                  <h3 className="text-lg">Discover</h3>
                </td>
                <td>
                  <h3 className="text-lg">
                    faijadfahfljkdjfhiuadhf aiuhflahf auh alhfaiuhf all{" "}
                  </h3>
                </td>
              </tr>
              <tr className="border-b">
                <td>
                  <h3 className="text-lg">1</h3>
                </td>
                <td>
                  <h3 className="text-lg">Discover</h3>
                </td>
                <td>
                  <h3 className="text-lg">
                    faijadfahfljkdjfhiuadhf aiuhflahf auh alhfaiuhf all{" "}
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h3 className="text-lg">1</h3>
                </td>
                <td>
                  <h3 className="text-lg">Discover</h3>
                </td>
                <td>
                  <h3 className="text-lg">
                    faijadfahfljkdjfhiuadhf aiuhflahf auh alhfaiuhf all{" "}
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <WorkExp />
      </div>
    </section>
  );
}

function WorkExp() {
  return (
    <div className="sm:flex items-center justify-evenly mx-auto gap-12">
      {/* Left content*/}
      <div className="flex flex-col flex-1/3 gap-4">
        <h3 className="text-5xl mb-5">Working Experience</h3>
        <p className="text-lg text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
          ratione. Voluptas eligendi ab corrupti. Dolor odit veniam hic
          voluptatibus laboriosam maiores sequi ratione architecto, porro nam
          molestias voluptatum adipisci reprehenderit.
        </p>
      </div>
      {/* Right content */}
      <div className="flex flex-col flex-1/2 gap-4">
        <div className="flex p-3 justify-between items-center">
          <h3 className="font-semibold text-lg">UI UX Designer</h3>
          <div className="flex text-gray-700 items-end flex-col">
            <span className="">Freelance</span>
            <span>2020 - Present</span>
          </div>
        </div>
        <div className="flex p-3 justify-between items-center">
          <h3 className="font-semibold text-lg">UI UX Designer</h3>
          <div className="flex text-gray-700 items-end flex-col">
            <span className="">Freelance</span>
            <span>2020 - Present</span>
          </div>
        </div>
        <div className="flex p-3 justify-between items-center">
          <h3 className="font-semibold text-lg">UI UX Designer</h3>
          <div className="flex text-gray-700 items-end flex-col">
            <span className="">Freelance</span>
            <span>2020 - Present</span>
          </div>
        </div>
        <div className="flex p-3 justify-between items-center">
          <h3 className="font-semibold text-lg">UI UX Designer</h3>
          <div className="flex text-gray-700 items-end flex-col">
            <span className="">Freelance</span>
            <span>2020 - Present</span>
          </div>
        </div>
        <div className="flex p-3 justify-between items-center">
          <h3 className="font-semibold text-lg">UI UX Designer</h3>
          <div className="flex text-gray-700 items-end flex-col">
            <span className="">Freelance</span>
            <span>2020 - Present</span>
          </div>
        </div>
      </div>
    </div>
  );
}
