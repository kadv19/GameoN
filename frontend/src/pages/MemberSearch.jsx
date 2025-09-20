import React, { useState } from 'react';
import { membersAPI } from '../services/api';
import { Search, Phone, User, Mail, DollarSign, Calendar, CheckCircle, XCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const MemberSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('phone'); // 'phone' or 'name'
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError('');
    setHasSearched(true);

    try {
      let response;
      if (searchType === 'phone') {
        response = await membersAPI.searchByPhone(searchQuery.trim());
        // If searching by phone, wrap single result in array
        setSearchResults(response.data ? [response.data] : []);
      } else {
        response = await membersAPI.searchByName(searchQuery.trim());
        setSearchResults(response.data || []);
      }
    } catch (error) {
      console.error('Search error:', error);
      if (error.response?.status === 404) {
        setSearchResults([]);
        setError('No members found matching your search criteria');
      } else {
        setError('Search failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
    setError('');
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-blue-600 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="font-gaming text-3xl font-bold text-white mb-2">
            Member Search
          </h1>
          <p className="text-white/70">Find members by phone number or name</p>
        </div>

        {/* Search Form */}
        <div className="card mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Type Toggle */}
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setSearchType('phone')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  searchType === 'phone'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Search by Phone
              </button>
              <button
                type="button"
                onClick={() => setSearchType('name')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  searchType === 'name'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Search by Name
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-1 relative">
                {searchType === 'phone' ? (
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                ) : (
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                )}
                <input
                  type={searchType === 'phone' ? 'tel' : 'text'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                  placeholder={
                    searchType === 'phone' 
                      ? 'Enter phone number' 
                      : 'Enter member name'
                  }
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`btn-secondary flex items-center space-x-2 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Search className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Search</span>
              </button>
              {(searchQuery || hasSearched) && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Loading State */}
        {isLoading && <LoadingSpinner message="Searching members..." />}

        {/* Search Results */}
        {!isLoading && hasSearched && (
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    Search Results ({searchResults.length})
                  </h2>
                </div>

                {/* Results Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((member) => (
                    <div key={member.id} className="card hover:scale-105 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1">
                            {member.name}
                          </h3>
                          <p className="text-white/60 text-sm">@{member.username}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          member.active ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-sm">
                          <Phone className="h-4 w-4 text-white/50" />
                          <span className="text-white/80">{member.phone}</span>
                        </div>

                        <div className="flex items-center space-x-3 text-sm">
                          <Mail className="h-4 w-4 text-white/50" />
                          <span className="text-white/80">{member.email}</span>
                        </div>

                        <div className="flex items-center space-x-3 text-sm">
                          <DollarSign className="h-4 w-4 text-white/50" />
                          <span className="text-white/80">
                            Balance: ${member.balance?.toFixed(2) || '0.00'}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 text-sm">
                          {member.active ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`${
                            member.active ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {member.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/20">
                        <button className="w-full btn-secondary text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white/70 mb-2">
                  No Members Found
                </h3>
                <p className="text-white/50">
                  No members match your search criteria. Try a different {searchType}.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!hasSearched && !isLoading && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/70 mb-2">
              Ready to Search
            </h3>
            <p className="text-white/50">
              Enter a phone number or name to find members
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberSearch;