import React, { useState } from 'react';
import { BarChart, DollarSign, Eye, Heart, MessageCircle, Plus, Settings, TrendingUp } from 'lucide-react';
import { mockListings } from '../data/mockData';
import ListingCard from '../components/features/ListingCard';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const userListings = mockListings.filter(listing => listing.sellerId === 'user1');
  
  const stats = [
    {
      title: 'Annonces actives',
      value: userListings.length,
      icon: <Plus className="text-blue-600" size={24} />,
      change: '+2 ce mois'
    },
    {
      title: 'Vues totales',
      value: '1,234',
      icon: <Eye className="text-green-600" size={24} />,
      change: '+15% cette semaine'
    },
    {
      title: 'Favoris',
      value: '89',
      icon: <Heart className="text-red-600" size={24} />,
      change: '+8 ce mois'
    },
    {
      title: 'Messages',
      value: '23',
      icon: <MessageCircle className="text-purple-600" size={24} />,
      change: '5 non lus'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: <BarChart size={20} /> },
    { id: 'listings', label: 'Mes annonces', icon: <Plus size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageCircle size={20} /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Dashboard</h1>
          <p className="text-gray-600">Gérez vos annonces et suivez vos performances</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-2">{stat.change}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Performances</h2>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>7 derniers jours</option>
                  <option>30 derniers jours</option>
                  <option>3 derniers mois</option>
                </select>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <TrendingUp size={48} className="mx-auto mb-4" />
                  <p>Graphique des performances</p>
                  <p className="text-sm">Vues, favoris, messages par jour</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Activité récente</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Eye className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Nouvelle vue sur "Honda CB650R 2021"</p>
                    <p className="text-sm text-gray-600">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="text-red-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Ajout aux favoris</p>
                    <p className="text-sm text-gray-600">Il y a 5 heures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-green-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Nouveau message reçu</p>
                    <p className="text-sm text-gray-600">Il y a 1 jour</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Mes annonces</h2>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                + Nouvelle annonce
              </button>
            </div>
            
            {userListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map(listing => (
                  <div key={listing.id} className="relative">
                    <ListingCard listing={listing} />
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded-full">
                      Active
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <Plus size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune annonce</h3>
                <p className="text-gray-600 mb-4">Commencez par déposer votre première annonce</p>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Déposer une annonce
                </button>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Messages</h2>
            <div className="text-center py-12">
              <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Messagerie intégrée</h3>
              <p className="text-gray-600">Communiquez directement avec les acheteurs intéressés</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Paramètres du compte</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom d'affichage
                </label>
                <input
                  type="text"
                  defaultValue="Pierre Martin"
                  className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="pierre.martin@email.com"
                  className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  defaultValue="06 12 34 56 78"
                  className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="pt-4">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;