package com.UltimateGaming.GameoN.controller;

import com.UltimateGaming.GameoN.dto.TransactionDto;
import com.UltimateGaming.GameoN.model.Transaction;
import com.UltimateGaming.GameoN.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public Transaction addTransaction(@Valid @RequestBody TransactionDto dto) {
        return transactionService.createTransaction(dto);
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @DeleteMapping
    public String deleteAllTransactions() {
        transactionService.deleteAllTransactions();
        return "All transactions have been deleted successfully.";
    }
}
