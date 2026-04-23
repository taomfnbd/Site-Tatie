import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../common/StaticDragonfly';
import EditableText from '../components/admin/EditableText';
import EditableImage from '../components/admin/EditableImage';

const About = () => {
  const [content, setContent] = useState({
    hero: {
      title: 'À <span class="text-[#95a58d]">propos</span>',
      subtitle: 'Mon parcours et ma vision de la naturopathie',
    },
    about: {
      title: 'Qui suis-je ?',
      subtitle: 'Alaïs Tavernier, naturopathe certifiée',
      paragraphs: [
        'Après plusieurs années dans le domaine de la santé, j\'ai découvert la naturopathie et son approche préventive et naturelle.',
        'Formée à l\'école Aesculape d\'Aix-en-Provence, j\'ai acquis une solide expertise en nutrition, phytothérapie, aromathérapie et techniques de bien-être.',
        'Ma mission : vous accompagner avec bienveillance dans votre recherche d\'équilibre et de vitalité.',
      ],
      imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/1.svg',
    },
  });

  return (
    <div className="py-20 relative overflow-hidden bg-stone-25">
      <StaticDragonfly type={2} className="absolute top-24 right-16 w-28 h-28 opacity-80 hidden lg:block" />
      <StaticDragonfly type={1} className="absolute bottom-32 left-16 w-24 h-24 opacity-75 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6 tracking-wide">
            <EditableText
              value={content.hero.title}
              onChange={(val) => setContent({ ...content, hero: { ...content.hero, title: val } })}
              element="span"
              allowHTML={true}
              className="inline"
            />
          </h1>
          <EditableText
            value={content.hero.subtitle}
            onChange={(val) => setContent({ ...content, hero: { ...content.hero, subtitle: val } })}
            element="p"
            className="text-lg text-stone-600 max-w-2xl mx-auto font-light"
          />
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-green-25 to-stone-25 rounded-2xl p-8 lg:p-12 relative border border-stone-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <EditableText
                value={content.about.title}
                onChange={(val) => setContent({ ...content, about: { ...content.about, title: val } })}
                element="h2"
                className="text-2xl font-medium text-stone-800 tracking-wide"
              />
              <EditableText
                value={content.about.subtitle}
                onChange={(val) => setContent({ ...content, about: { ...content.about, subtitle: val } })}
                element="p"
                className="text-base text-stone-600 leading-relaxed font-light"
              />
              <div className="space-y-4 text-base text-stone-700 leading-relaxed font-light">
                {content.about.paragraphs.map((paragraph, index) => (
                  <EditableText
                    key={index}
                    value={paragraph}
                    onChange={(val) => {
                      const newParagraphs = [...content.about.paragraphs];
                      newParagraphs[index] = val;
                      setContent({ ...content, about: { ...content.about, paragraphs: newParagraphs } });
                    }}
                    element="p"
                    className="inline"
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-white">
                <EditableImage
                  src={content.about.imageUrl}
                  alt="Alaïs Tavernier"
                  onChange={(val) => setContent({ ...content, about: { ...content.about, imageUrl: val } })}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
