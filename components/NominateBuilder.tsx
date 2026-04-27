import NomineeForm from "./NomineeForm";

export default function NominateBuilder(){
    return (
            <div className="w-full min-h-screen bg-[#FEF7ED] ">
            <div className="w-full container mx-auto px-6 md:px-8 flex flex-col items-center py-10 space-y-4">
            <span className="text-5xl text-center">Everyday Builders</span>
                        <p className="max-w-md text-md font-bold text-center">The Ones Who Wake Up and Create</p>
            <p className="max-w-2xl text-sm text-[#878787] text-center">Africa is built by people who show up every day quietly, consistently, with purpose. Farmers. Creators. Entrepreneurs. Teachers. Engineers. Dreamers. We call them Everyday Builders. Not because what they do is ordinary but because they do it every single day.</p>

            <div className="md:max-w-3xl w-full">
                <NomineeForm />
            </div>

           </div>
        </div>
    );
}