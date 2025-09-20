package com.UltimateGaming.GameoN.repository;

import com.UltimateGaming.GameoN.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
}
