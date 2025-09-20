package com.UltimateGaming.GameoN.service;

import com.UltimateGaming.GameoN.model.Member;
import com.UltimateGaming.GameoN.model.Recharge;
import com.UltimateGaming.GameoN.repository.MemberRepository;
import com.UltimateGaming.GameoN.repository.RechargeRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RechargeService {

    private final RechargeRepository rechargeRepository;
    private final MemberRepository memberRepository;
    private final CollectionService collectionService; // Inject CollectionService

    @Autowired
    public RechargeService(RechargeRepository rechargeRepository,
                           MemberRepository memberRepository,
                           CollectionService collectionService) {
        this.rechargeRepository = rechargeRepository;
        this.memberRepository = memberRepository;
        this.collectionService = collectionService;
    }

    public Recharge createRecharge(String memberId, double amount) {
        ObjectId objectId = new ObjectId(memberId);

        // Save recharge record
        Recharge recharge = new Recharge(objectId, amount);
        Recharge savedRecharge = rechargeRepository.save(recharge);

        // Update member balance
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        member.setBalance(member.getBalance() + amount);
        memberRepository.save(member);

        // Update daily collection automatically
        collectionService.addToCollection(amount);

        return savedRecharge;
    }

    public List<Recharge> getAllRecharges() {
        return rechargeRepository.findAll();
    }

    public void deleteAllRecharges() {
        rechargeRepository.deleteAll();
    }
}
