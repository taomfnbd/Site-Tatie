import React from "react";
import { motion } from "framer-motion";
import StaticDragonfly from "../../common/StaticDragonfly";
import EditableText from "../admin/EditableText";
import EditableImage from "../admin/EditableImage";

const ServiceHeroSection = ({ content, onUpdate }) => {
  const data = {
    title: "Titre du service",
    subtitle: "Description courte du service",
    imageUrl: "https://raw.githubusercontent.com/taomfnbd/image2/main/2.svg",
    ...content,
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center lg:text-left relative order-2 lg:order-1"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-block text-[#6b7563] text-sm font-medium tracking-widest uppercase mb-4"
          >
            &bull; &bull; &bull;
          </motion.span>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light text-stone-800 mb-6 tracking-wide leading-tight">
            <EditableText
              value={data.title}
              onChange={(val) => updateField("title", val)}
              element="span"
              allowHTML={true}
              className="inline"
            />
          </h1>
          <div className="w-16 h-[2px] bg-[#95a58d]/40 mx-auto lg:mx-0 mb-6" />
          <EditableText
            value={data.subtitle}
            onChange={(val) => updateField("subtitle", val)}
            element="p"
            className="text-lg lg:text-xl text-stone-600 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative order-1 lg:order-2"
        >
          <div className="absolute -inset-4 bg-[#95a58d]/5 rounded-3xl -z-10" />
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-white flex items-center justify-center">
            <EditableImage
              src={data.imageUrl}
              alt="Service illustration"
              onChange={(val) => updateField("imageUrl", val)}
              className="w-full h-full object-cover"
            />
          </div>
          <StaticDragonfly
            type={3}
            className="absolute -top-6 -right-8 w-16 h-16 opacity-60"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceHeroSection;
