import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

type HeaderProps = {
  onLoginClick: () => void;
};

const Header = ({ onLoginClick }: HeaderProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const location = useLocation()

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (location.pathname !== "/favorites") {
        onLoginClick();
        }
    };


    return (
        <div className="bg-[#f9f6f2] fixed top-0 z-50 w-full">
            <div className="px-4 md:px-10 md:max-lg:px-8 xl:px-20 py-4 flex items-center justify-between">
                <div className="flex items-end gap-10">
                    <Link to="/">
                        <a href="" className="text-4xl font-bold">
                            BIGG <span className="text-[#fab55f]">FOOD</span>
                        </a>
                    </Link>
                    <nav className="hidden lg:block">
                        <ul className="flex md:gap-10 uppercase text-sm text-black font-medium tracking-[0.5px]">
                            <li className="hover:underline">
                                <Link to="/" >meal name</Link>
                            </li>
                            <li className="hover:underline">
                                <Link to="/ingredient">ingredient</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="#"
                        onClick={handleFavoriteClick}    
                        className="hidden lg:block bg-[#fab55f] hover:bg-[#f7a743] text-sm text-white rounded-lg py-3 px-7">
                        My Favorites
                    </Link>
                    <div className="lg:hidden border border-black/50 p-2 rounded-md" onClick={() => setIsOpen(!isOpen)}> {isOpen ? <X className="text-black w-8 h-8 lg:hidden" /> : <Menu className="text-black w-8 h-8 lg:hidden" />} </div>
                </div>
                
            <AnimatePresence>
                { isOpen && <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, y: -100 }}
                    exit={{ opacity: 0, y: -100 }}
                    animate={ { opacity: 1, y: 0 } }
                    transition={{ duration: 1, ease: "easeOut", bounce: 0.3 }}
                    className={`fixed left-0 top-20 z-20 w-full bg-[#fab55f] px-4 pt-5 {!isOpen && translate-x-10}`}
                    >
                <nav>
                    <ul className="text-white font-bold uppercase space-y-4 text-sm gap-24 pb-6">
                        <li><Link to="/" onClick={() => setIsOpen(false)} className="">
                                    meal name
                                </Link>
                            </li>
                            <li><Link to="/ingredient" onClick={() => setIsOpen(false)}>
                                    ingredient
                                </Link>
                            </li>
                            <li className="pt-6">
                                <Link to="#"
                                    onClick={handleFavoriteClick}    
                                    className="bg-white hover:bg-[#f7a743] text-sm text-[#fab55f] rounded-lg py-3 px-7">
                                    My Favorites
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </motion.div>}
            </AnimatePresence>
            </div>
        </div>
    )
}

export default Header