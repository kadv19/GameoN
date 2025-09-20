package com.UltimateGaming.GameoN.service;

import com.UltimateGaming.GameoN.dto.TransactionDto;
import com.UltimateGaming.GameoN.model.Transaction;
import com.UltimateGaming.GameoN.repository.TransactionRepository;
import com.mongodb.client.result.DeleteResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final CollectionService collectionService;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository,
                              CollectionService collectionService,
                              MongoTemplate mongoTemplate) {
        this.transactionRepository = transactionRepository;
        this.collectionService = collectionService;
        this.mongoTemplate = mongoTemplate;
    }

    public Transaction createTransaction(TransactionDto dto) {
        // Handle both ObjectId and username formats
        ObjectId memberId;
        try {
            memberId = new ObjectId(dto.getMemberId());
        } catch (IllegalArgumentException e) {
            // If not a valid ObjectId, treat as username and find member
            throw new RuntimeException("Invalid member ID format: " + dto.getMemberId());
        }
        
        ObjectId gameId = new ObjectId(dto.getGameId());

        Transaction transaction = new Transaction(memberId, gameId, dto.getAmount());
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Update daily collection automatically
        collectionService.addToCollection(dto.getAmount());

        return savedTransaction;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public void deleteAllTransactions() {
        transactionRepository.deleteAll();
    }

    // ✅ robust delete-by-id
    public void deleteTransactionById(String id) {
        // 1) try normal repository delete
        if (transactionRepository.existsById(id)) {
            transactionRepository.deleteById(id);
            return;
        }

        // 2) try as ObjectId if DB stores as ObjectId
        try {
            ObjectId oid = new ObjectId(id);
            Query q = Query.query(Criteria.where("_id").is(oid));
            DeleteResult result = mongoTemplate.remove(q, Transaction.class);
            if (result.getDeletedCount() > 0) return;
        } catch (IllegalArgumentException ignored) {
            // invalid id string
        }

        throw new RuntimeException("Transaction not found for id: " + id);
    }
}
