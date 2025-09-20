import React, { useState, useEffect } from 'react';
import { collectionsAPI, rechargesAPI, transactionsAPI } from '../services/api';
import { BarChart3, Calendar, DollarSign, TrendingUp, Filter } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Collections = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [collectionData, setCollectionData] = useState(null);
  const [recharges, setRecharges] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCollectionData();
  }, [selectedDate]);

  const loadCollectionData = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Load collection data for selected date
      let collectionResponse;
      try {
        collectionResponse = await collectionsAPI.getByDate(selectedDate);
        setCollectionData(collectionResponse.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setCollectionData(null);
        } else {
          throw err;
        }
      }

      // Load all recharges and transactions for detailed view
      const [rechargesResponse, transactionsResponse] = await Promise.all([
        rechargesAPI.getAll(),
        transactionsAPI.getAll()
      ]);

      // Filter by selected date
      const selectedDateObj = new Date(selectedDate);
      const filteredRecharges = (rechargesResponse.data || []).filter(recharge => {
        const rechargeDate = new Date(recharge.dateTime);
        return rechargeDate.toDateString() === selectedDateObj.toDateString();
      });

      const filteredTransactions = (transactionsResponse.data || []).filter(transaction => {
        const transactionDate = new Date(transaction.timestamp);
        return transactionDate.toDateString() === selectedDateObj.toDateString();
      });

      setRecharges(filteredRecharges);
      setTransactions(filteredTransactions);
    } catch (error) {
      console.error('Error loading collection data:', error);
      setError('Failed to load collection data');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotals = () => {
    const totalRecharges = recharges.reduce((sum, recharge) => sum + (recharge.amount || 0), 0);
    const totalTransactions = transactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
    const totalCollection = totalRecharges + totalTransactions;

    return {
      totalRecharges,
      totalTransactions,
      totalCollection
    };
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

  const formatCurrency = (amount) => {
    return `$${(amount || 0).toFixed(2)}`;
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="font-gaming text-3xl font-bold text-white mb-2">
            Collections Dashboard
          </h1>
          <p className="text-white/70">Track daily revenue and transactions</p>
        </div>

        {/* Date Filter */}
        <div className="card mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-white/60" />
              <span className="text-white/80 font-medium">Filter by Date:</span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input-field w-auto"
              />
              <button
                onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                className="btn-secondary flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Today</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <LoadingSpinner message="Loading collection data..." />}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm mb-6">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Total Recharges</p>
                    <p className="text-2xl font-bold text-green-400">
                      {formatCurrency(totals.totalRecharges)}
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      {recharges.length} transactions
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Game Revenue</p>
                    <p className="text-2xl font-bold text-gaming-accent">
                      {formatCurrency(totals.totalTransactions)}
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      {transactions.length} games played
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-gaming-accent" />
                </div>
              </div>

              <div className="card bg-gradient-to-br from-gaming-accent/20 to-gaming-gold/20 border-gaming-accent/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Total Collection</p>
                    <p className="text-2xl font-bold text-gaming-gold">
                      {formatCurrency(totals.totalCollection)}
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-gaming-gold" />
                </div>
              </div>
            </div>

            {/* Detailed Tables */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recharges Table */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Recharges</h2>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(totals.totalRecharges)}
                  </span>
                </div>

                {recharges.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-2 text-white/80 font-medium text-sm">Time</th>
                          <th className="text-left py-2 text-white/80 font-medium text-sm">Member</th>
                          <th className="text-right py-2 text-white/80 font-medium text-sm">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recharges.map((recharge, index) => (
                          <tr key={recharge.id || index} className="table-row">
                            <td className="py-2 text-white/90 text-sm">
                              {new Date(recharge.dateTime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="py-2 text-white/70 text-sm">
                              {recharge.memberId || 'Unknown'}
                            </td>
                            <td className="py-2 text-right">
                              <span className="text-green-400 font-semibold text-sm">
                                +{formatCurrency(recharge.amount)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-white/30 mx-auto mb-2" />
                    <p className="text-white/50 text-sm">No recharges for this date</p>
                  </div>
                )}
              </div>

              {/* Transactions Table */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Game Transactions</h2>
                  <span className="text-gaming-accent font-semibold">
                    {formatCurrency(totals.totalTransactions)}
                  </span>
                </div>

                {transactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-2 text-white/80 font-medium text-sm">Time</th>
                          <th className="text-left py-2 text-white/80 font-medium text-sm">Game</th>
                          <th className="text-right py-2 text-white/80 font-medium text-sm">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction, index) => (
                          <tr key={transaction.id || index} className="table-row">
                            <td className="py-2 text-white/90 text-sm">
                              {new Date(transaction.timestamp).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="py-2 text-white/70 text-sm">
                              {transaction.gameId || 'Unknown Game'}
                            </td>
                            <td className="py-2 text-right">
                              <span className="text-gaming-accent font-semibold text-sm">
                                {formatCurrency(transaction.amount)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <DollarSign className="h-12 w-12 text-white/30 mx-auto mb-2" />
                    <p className="text-white/50 text-sm">No game transactions for this date</p>
                  </div>
                )}
              </div>
            </div>

            {/* No Data State */}
            {totals.totalCollection === 0 && (
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white/70 mb-2">
                  No Collections Found
                </h3>
                <p className="text-white/50">
                  No transactions or recharges recorded for {new Date(selectedDate).toLocaleDateString()}.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Collections;