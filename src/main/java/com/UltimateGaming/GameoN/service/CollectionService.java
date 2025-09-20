package com.UltimateGaming.GameoN.service;

import com.UltimateGaming.GameoN.model.Collection;
import com.UltimateGaming.GameoN.repository.CollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CollectionService {

    private final CollectionRepository collectionRepository;

    @Autowired
    public CollectionService(CollectionRepository collectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    /**
     * Adds the given amount to today's collection.
     * If today's collection does not exist, create a new document.
     */
    public Collection addToCollection(double amount) {
        LocalDate today = LocalDate.now();
        Optional<Collection> existing = collectionRepository.findByDate(today);

        if (existing.isPresent()) {
            Collection col = existing.get();
            col.setAmount(col.getAmount() + amount);
            return collectionRepository.save(col);
        } else {
            Collection col = new Collection(today, amount);
            return collectionRepository.save(col);
        }
    }

    /**
     * Get a collection by a specific date
     */
    public Optional<Collection> getCollectionByDate(LocalDate date) {
        return collectionRepository.findByDate(date);
    }

    /**
     * Get all collections
     */
    public List<Collection> getAllCollections() {
        return collectionRepository.findAll();
    }

    /**
     * Delete all collections
     */
    public void deleteAllCollections() {
        collectionRepository.deleteAll();
    }
}
