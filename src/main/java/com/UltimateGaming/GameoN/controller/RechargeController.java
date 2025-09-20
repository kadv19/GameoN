package com.UltimateGaming.GameoN.controller;

import com.UltimateGaming.GameoN.model.Recharge;
import com.UltimateGaming.GameoN.service.RechargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recharges")
public class RechargeController {

    private final RechargeService rechargeService;

    @Autowired
    public RechargeController(RechargeService rechargeService) {
        this.rechargeService = rechargeService;
    }

    @PostMapping
    public Recharge createRecharge(@RequestBody Map<String, Object> body) {
        String memberId = (String) body.get("memberId");
        double amount = ((Number) body.get("amount")).doubleValue();
        return rechargeService.createRecharge(memberId, amount);
    }

    @GetMapping
    public List<Recharge> getAllRecharges() {
        return rechargeService.getAllRecharges();
    }
}
