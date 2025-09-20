package com.UltimateGaming.GameoN.controller;

import com.UltimateGaming.GameoN.model.*;
import com.UltimateGaming.GameoN.repository.*;
import com.UltimateGaming.GameoN.service.CollectionService;
import com.UltimateGaming.GameoN.service.RechargeService;
import com.UltimateGaming.GameoN.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/dashboard") // base path
public class AdminController {

    private final MemberRepository memberRepository;
    private final GameRepository gameRepository;
    private final TransactionService transactionService;
    private final RechargeService rechargeService;
    private final CollectionService collectionService;

    @Autowired
    public AdminController(MemberRepository memberRepository,
                           GameRepository gameRepository,
                           TransactionService transactionService,
                           RechargeService rechargeService,
                           CollectionService collectionService) {
        this.memberRepository = memberRepository;
        this.gameRepository = gameRepository;
        this.transactionService = transactionService;
        this.rechargeService = rechargeService;
        this.collectionService = collectionService;
    }

    // ----------------- Members -----------------
    @GetMapping("/members")
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @GetMapping("/members/{id}")
    public Member getMemberById(@PathVariable String id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    @PostMapping("/members")
    public Member addMember(@RequestBody Member member) {
        return memberRepository.save(member);
    }

    @PutMapping("/members/{id}")
    public Member updateMember(@PathVariable String id, @RequestBody Member memberDetails) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        member.setName(memberDetails.getName());
        member.setPhone(memberDetails.getPhone());
        member.setBalance(memberDetails.getBalance());
        member.setActive(memberDetails.isActive());
        return memberRepository.save(member);
    }

    @DeleteMapping("/members/{id}")
    public void deleteMember(@PathVariable String id) {
        memberRepository.deleteById(id);
    }

    // 🔍 Search members by name (partial, case-insensitive)
    @GetMapping("/members/search/name/{name}")
    public List<Member> searchMembersByName(@PathVariable String name) {
        return memberRepository.findByNameContainingIgnoreCase(name);
    }

    // 🔍 Search member by phone
    @GetMapping("/members/search/phone/{phone}")
    public ResponseEntity<Member> searchMemberByPhone(@PathVariable String phone) {
        return memberRepository.findByPhone(phone)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ----------------- Games -----------------
    @GetMapping("/games")
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @PostMapping("/games")
    public Game addGame(@RequestBody Game game) {
        return gameRepository.save(game);
    }

    @PutMapping("/games/{id}")
    public Game updateGame(@PathVariable String id, @RequestBody Game gameDetails) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        game.setName(gameDetails.getName());
        game.setDescription(gameDetails.getDescription());
        game.setPrice(gameDetails.getPrice());
        return gameRepository.save(game);
    }

    @DeleteMapping("/games/{id}")
    public void deleteGame(@PathVariable String id) {
        gameRepository.deleteById(id);
    }

    // ----------------- Transactions -----------------
    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @DeleteMapping("/transactions")
    public void deleteAllTransactions() {
        transactionService.deleteAllTransactions();
    }

    // ✅ Delete one transaction by id
    @DeleteMapping("/transactions/{id}")
    public ResponseEntity<String> deleteTransactionById(@PathVariable String id) {
        transactionService.deleteTransactionById(id);
        return ResponseEntity.ok("Transaction deleted");
    }

    // ----------------- Recharges -----------------
    @GetMapping("/recharges")
    public List<Recharge> getAllRecharges() {
        return rechargeService.getAllRecharges();
    }

    // ----------------- Collections -----------------
    @GetMapping("/collections/{date}")
    public ResponseEntity<?> getCollectionByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        Optional<Collection> collectionOpt = collectionService.getCollectionByDate(localDate);
        if (collectionOpt.isPresent()) {
            return ResponseEntity.ok(collectionOpt.get());
        } else {
            return ResponseEntity.status(404).body("No collection found for date: " + date);
        }
    }

    @GetMapping("/collections/today")
    public ResponseEntity<?> getTodayCollection() {
        Optional<Collection> collectionOpt = collectionService.getCollectionByDate(LocalDate.now());
        if (collectionOpt.isPresent()) {
            return ResponseEntity.ok(collectionOpt.get());
        } else {
            return ResponseEntity.status(404).body("No collection found for today");
        }
    }
}
