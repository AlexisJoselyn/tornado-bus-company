import Navbar from "./navbar";
import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center justify-between w-full p-4 text-blue-800 border-b-4 border-orange-600">
            <Image
                src="https://tornadobus.com/wp-content/uploads/2022/07/Recurso-3.svg"
                width={120}
                height={24}
                alt="Logo of the bus company"
            />
            <Navbar />
        </header>
    )
}