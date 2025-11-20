import React from 'react';
import SafeIcon from '../common/SafeIcon';
import DragonflyImage from '../common/DragonflyImage';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiRefreshCw, FiHome } = FiIcons;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.handleReload = this.handleReload.bind(this);
    this.handleGoHome = this.handleGoHome.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log l'erreur pour le monitoring
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload() {
    window.location.reload();
  }

  handleGoHome() {
    window.location.href = '/';
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-25 px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
              <div className="w-16 h-16 mx-auto mb-6 opacity-60">
                <DragonflyImage type={2} alt="Erreur" />
              </div>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <SafeIcon icon={FiAlertTriangle} className="text-amber-500 text-xl" />
                <h2 className="text-xl font-medium text-stone-800">
                  Oups, une erreur s'est produite
                </h2>
              </div>
              
              <p className="text-stone-600 mb-6 font-light">
                Nous nous excusons pour ce désagrément. L'erreur a été signalée et sera corrigée rapidement.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={this.handleReload}
                  className="w-full flex items-center justify-center space-x-2 bg-[#95a58d] text-white px-6 py-3 rounded-lg hover:bg-[#7a8471] transition-colors"
                >
                  <SafeIcon icon={FiRefreshCw} />
                  <span>Recharger la page</span>
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="w-full flex items-center justify-center space-x-2 border border-stone-300 text-stone-700 px-6 py-3 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <SafeIcon icon={FiHome} />
                  <span>Retour à l'accueil</span>
                </button>
              </div>
              
              {/* Informations de debug en développement */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-stone-500 hover:text-stone-700">
                    Détails techniques (développement)
                  </summary>
                  <div className="mt-2 p-3 bg-stone-50 rounded text-xs text-stone-600 overflow-auto max-h-32">
                    <div className="font-medium mb-1">Erreur:</div>
                    <div className="mb-2">{this.state.error.toString()}</div>
                    <div className="font-medium mb-1">Stack trace:</div>
                    <pre className="whitespace-pre-wrap text-xs">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;