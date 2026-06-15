import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SafeIcon from "../../common/SafeIcon";
import StaticDragonfly from "../../common/StaticDragonfly";
import EditableText from "../admin/EditableText";
import EditableImage from "../admin/EditableImage";
import { FiCalendar, FiMail } from "react-icons/fi";

const HeroSection = ({ content, onUpdate }) => {
  // Valeurs par défaut si le contenu est vide
  const data = {
    firstName: "Alaïs",
    lastName: "Tavernier",
    profession: "Naturopathe",
    subtitle: "Massage bien-être",
    description:
      "Éducatrice de la santé, je vous accompagne pour que vous deveniez autonome et acteur de votre bien-être.",
    quote: "La force qui est en chacun de nous est notre plus grand médecin",
    quoteAuthor: "Hippocrate",
    imageUrl: "https://raw.githubusercontent.com/taomfnbd/image2/main/1.svg",
    ...content,
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-25 via-green-25 to-stone-50 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 bg-[#95a58d] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-32 sm:w-40 h-32 sm:h-40 bg-green-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 sm:w-24 h-16 sm:h-24 bg-stone-300 rounded-full blur-2xl"></div>
      </div>
      <StaticDragonfly
        type={1}
        className="absolute top-24 sm:top-28 lg:top-32 left-4 sm:left-8 lg:left-16 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 opacity-70 hidden sm:block"
      />
      <div className="relative max-w-7xl mx-auto py-10 sm:py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Photo : au-dessus du texte sur mobile, à droite sur desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2 mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-stone-100">
              <EditableImage
                src={data.imageUrl}
                alt="Alaïs Tavernier, naturopathe à Vacqueyras"
                onChange={(val) => updateField("imageUrl", val)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-[#95a58d]/15 rounded-full blur-xl"></div>
            <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-green-200/25 rounded-full blur-lg"></div>
          </motion.div>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 text-center lg:text-left w-full"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-stone-800 mb-6 sm:mb-8 tracking-wide leading-tight">
              <EditableText
                value={data.firstName}
                onChange={(val) => updateField("firstName", val)}
                element="span"
                className="inline"
              />{" "}
              <EditableText
                value={data.lastName}
                onChange={(val) => updateField("lastName", val)}
                element="span"
                className="text-[#6b7563] font-normal inline"
              />
            </h1>
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <EditableText
                value={data.profession}
                onChange={(val) => updateField("profession", val)}
                element="p"
                className="text-lg sm:text-xl lg:text-2xl text-stone-600 mb-2 sm:mb-3 font-light"
              />
              <EditableText
                value={data.subtitle}
                onChange={(val) => updateField("subtitle", val)}
                element="p"
                className="text-base sm:text-lg lg:text-xl text-stone-500 font-light"
              />
            </div>
            <EditableText
              value={data.description}
              onChange={(val) => updateField("description", val)}
              element="p"
              className="text-base sm:text-lg lg:text-xl text-stone-600 mb-6 sm:mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            />
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 sm:mb-10 lg:mb-12"
            >
              <EditableText
                value={`"${data.quote}"`}
                onChange={(val) => updateField("quote", val.replace(/"/g, ""))}
                element="p"
                className="text-base sm:text-lg lg:text-xl text-[#6b7563] font-light italic"
              />
              <p className="text-sm sm:text-base text-stone-500 mt-2 sm:mt-3 font-light">
                —{" "}
                <EditableText
                  value={data.quoteAuthor}
                  onChange={(val) => updateField("quoteAuthor", val)}
                  element="span"
                  className="inline"
                />
              </p>
            </motion.blockquote>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start">
              <a
                href="https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-[#95a58d] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-medium hover:bg-[#7a8471] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <SafeIcon icon={FiCalendar} />
                <span>Prendre rendez-vous</span>
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center space-x-2 border border-[#95a58d] text-[#6b7563] px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-medium hover:bg-[#95a58d] hover:text-white transition-all duration-300"
              >
                <SafeIcon icon={FiMail} />
                <span>Me contacter</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
