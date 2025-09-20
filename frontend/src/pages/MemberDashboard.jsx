import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { gamesAPI, rechargesAPI, transactionsAPI } from '../services/api';
import { User, DollarSign, Gamepad2, History, Plus, TrendingUp } from 'lucide-react';
import GameCard from '../components/GameCard';
import LoadingSpinner from '../components/LoadingSpinner';

const MemberDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('games');
  const [games, setGames] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock member data (in real app, this would come from API)
  const memberData = {
    name: user?.username || 'Gaming Member',
    phone: '+1 (555) 123-4567',
    balance: 245.50,
    totalGamesPlayed: 15,
    totalRecharges: 3,
    memberSince: '2024-01-15'
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [gamesResponse, rechargesResponse, transactionsResponse] = await Promise.all([
        gamesAPI.getAll(),
        rechargesAPI.getAll(),
        transactionsAPI.getAll()
      ]);

      setGames(gamesResponse.data || []);
      setRecharges(rechargesResponse.data || []);
      setTransactions(transactionsResponse.data || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGamePlay = (game) => {
    // Refresh data after playing a game
    loadDashboardData();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gaming-accent to-gaming-gold rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="font-gaming text-3xl font-bold text-white">
                Welcome back, {memberData.name}!
              </h1>
              <p className="text-white/70">Ready for your next gaming adventure?</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Current Balance</p>
                <p className="text-2xl font-bold text-gaming-gold">
                  ${memberData.balance.toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-gaming-gold" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Games Played</p>
                <p className="text-2xl font-bold text-primary-400">
                  {memberData.totalGamesPlayed}
                </p>
              </div>
              <Gamepad2 className="h-8 w-8 text-primary-400" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Recharges</p>
                <p className="text-2xl font-bold text-green-400">
                  {memberData.totalRecharges}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Member Since</p>
                <p className="text-lg font-bold text-white">
                  {new Date(memberData.memberSince).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <User className="h-8 w-8 text-white/60" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="card mb-8">
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('games')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === 'games'
                  ? 'bg-gaming-accent text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Gamepad2 className="h-4 w-4" />
              <span>Available Games</span>
            </button>
            <button
              onClick={() => setActiveTab('recharge')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === 'recharge'
                  ? 'bg-gaming-accent text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <History className="h-4 w-4" />
              <span>Recharge History</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm mb-6">
            {error}
          </div>
        )}

        {activeTab === 'games' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Available Games</h2>
              <span className="text-white/60 text-sm">
                {games.length} games available
              </span>
            </div>

            {games.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {games.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onPlay={handleGamePlay}
                    showPlayButton={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Gamepad2 className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white/70 mb-2">
                  No Games Available
                </h3>
                <p className="text-white/50">
                  Check back later for new games!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'recharge' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recharge History</h2>
              <button className="btn-secondary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Recharge</span>
              </button>
            </div>

            {recharges.length > 0 ? (
              <div className="card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 px-4 text-white/80 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-white/80 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-white/80 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recharges.map((recharge, index) => (
                        <tr key={recharge.id || index} className="table-row">
                          <td className="py-3 px-4 text-white/90">
                            {formatDate(recharge.dateTime)}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-gaming-gold font-semibold">
                              +${recharge.amount?.toFixed(2) || '0.00'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <History className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white/70 mb-2">
                  No Recharge History
                </h3>
                <p className="text-white/50 mb-4">
                  You haven't made any recharges yet.
                </p>
                <button className="btn-primary flex items-center space-x-2 mx-auto">
                  <Plus className="h-4 w-4" />
                  <span>Make Your First Recharge</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;