import { IoLogoWhatsapp } from "react-icons/io5";

export function FloatingWhatsAppButton() {
    return (
        <a href="https://api.whatsapp.com/send?phone=628981548300" target="_self" className="fixed bottom-5 right-5 z-10">
            <div className="size-10 md:size-12 rounded-full center-flex bg-[#25D366]">
                <IoLogoWhatsapp className="text-white text-2xl md:text-3xl" />
            </div>
        </a>
    )
}