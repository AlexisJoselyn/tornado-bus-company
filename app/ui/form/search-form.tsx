import { ArrowsRightLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";
import Destination from "./destination";
import Origin from "./origin";

export default function SearchForm() {
    return (
        <form className="flex flex-col items-center justify-center gap-4 w-full max-w-3xl p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-blue-800">Encuentra el viaje ideal para ti</h1>
            {/* Departure and return options */}
            <div className="flex gap-4">
                <div className="flex items-center">
                    <input
                        id="ida"
                        name="status"
                        type="radio"
                        value="ida"
                        className="h-4 w-4 cursor-pointer focus:ring-2"
                        aria-describedby="customer-error"
                    />
                    <label
                        htmlFor="ida"
                        className="ml-1 flex cursor-pointer items-center gap-1.5 rounded-full py-1.5 text-s font-semibold"
                    >
                        Solo ida <ArrowRightIcon className="h-4 w-4" />
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="idavuelta"
                        name="status"
                        type="radio"
                        value="idavuelta"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                        htmlFor="idavuelta"
                        className="ml-1 flex cursor-pointer items-center gap-1.5 rounded-full py-1.5 text-s font-semibold"
                    >
                        Ida y vuelta <ArrowsRightLeftIcon className="h-4 w-4" />
                    </label>
                </div>
            </div>
            {/* Origin */}
            <Origin />
            {/* Destination */}
            <Destination />
            {/* Departure date */}
            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Search
            </button>
        </form>
    )
}