// Node 18+ a fetch natif, pas besoin de require
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Vérifier l'authentification (mot de passe admin simple via header ou body)
  // Pour simplifier, on suppose que l'interface admin protège l'accès.
  // Mais idéalement, il faudrait un token JWT ou autre.
  
  const { content } = JSON.parse(event.body);
  
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = process.env.REPO_OWNER; // ex: 'user'
  const REPO_NAME = process.env.REPO_NAME;   // ex: 'repo'
  const BRANCH = process.env.BRANCH || 'main';
  const FILE_PATH = 'src/data/siteContent.js';

  if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Configuration GitHub manquante (Variables d\'env)' })
    };
  }

  try {
    // 1. Récupérer le SHA du fichier actuel
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`,
      {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
      }
    );

    let sha;
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json();
      sha = fileData.sha;
    }

    // 2. Préparer le nouveau contenu
    const newFileContent = `export const initialSiteContent = ${JSON.stringify(content, null, 2)};`;
    const contentBase64 = Buffer.from(newFileContent).toString('base64');

    // 3. Commit
    const putResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Mise à jour du contenu via CMS',
          content: contentBase64,
          sha: sha, // Requis si le fichier existe déjà
          branch: BRANCH
        })
      }
    );

    if (!putResponse.ok) {
      const error = await putResponse.json();
      throw new Error(error.message || 'Erreur lors du commit GitHub');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Modifications publiées avec succès !' })
    };

  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
