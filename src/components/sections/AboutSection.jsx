import React from "react";
import { motion } from "framer-motion";
import StaticDragonfly from "../../common/StaticDragonfly";
import EditableText from "../admin/EditableText";

const AboutSection = ({ content, onUpdate }) => {
  const data = {
    titlePrefix: "Mon",
    title: "parcours de vie",
    subtitle: "Découvrez mon cheminement vers la naturopathie",
    content:
      "Je suis Alaïs, j'ai 40 ans. Mon parcours professionnel a débuté dans le domaine médical, en tant que secrétaire médicale, avant d'évoluer vers la comptabilité au sein d'un cabinet d'expertise... L'expérience du télétravail pendant la période du COVID m'a offert une véritable prise de conscience : mon activité ne correspondait plus à mes aspirations profondes. C'est donc tout naturellement que la naturopathie s'est imposée à moi comme une évidence. En 2022, j'ai ainsi intégré avec enthousiasme l'école Aesculape, école libre de naturopathie à Aix-en-Provence, pour y suivre trois années de formation riches d'apprentissage et de sens.",
    ...content,
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-white relative px-4 sm:px-6 lg:px-8">
      <StaticDragonfly
        type={3}
        className="absolute top-12 sm:top-16 lg:top-24 right-4 sm:right-8 lg:right-16 w-12 sm:w-16 lg:w-24 h-12 sm:h-16 lg:h-24 opacity-60 sm:opacity-75 hidden md:block"
      />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-stone-800 mb-4 tracking-wide">
            <EditableText
              value={data.titlePrefix}
              onChange={(val) => updateField("titlePrefix", val)}
              element="span"
              className="inline"
            />{" "}
            <EditableText
              value={data.title}
              onChange={(val) => updateField("title", val)}
              element="span"
              className="text-[#6b7563] inline"
            />
          </h2>
          <EditableText
            value={data.subtitle}
            onChange={(val) => updateField("subtitle", val)}
            element="p"
            className="text-sm sm:text-base lg:text-lg text-stone-600 max-w-2xl mx-auto font-light"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto bg-gradient-to-br from-green-25 to-stone-25 rounded-2xl p-6 sm:p-8 lg:p-12 relative overflow-hidden border border-stone-100"
        >
          <EditableText
            value={data.content}
            onChange={(val) => updateField("content", val)}
            element="div"
            className="space-y-3 sm:space-y-4 text-stone-700 leading-relaxed font-light text-sm sm:text-base lg:text-lg"
          />
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#95a58d]/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-200/20 rounded-full blur-lg"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
