import Navbar from "./navbar";
import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center justify-between w-full p-4 text-blue-800 border-b-4 border-orange-600">
            <div className="flex items-center gap-4">
                <Image
                    src="https://tornadobus.com/wp-content/uploads/2022/07/Recurso-3.svg"
                    width={180}
                    height={0}
                    style={{ height: "auto" }}
                    alt="Banner image of the bus company desktop version"
                />
            </div>
            <Navbar />
        </header>
    )
}