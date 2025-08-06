package com.telecom.billing.controller;

import com.telecom.billing.entity.Bill;
import com.telecom.billing.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/billing")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class BillingController {

    @Autowired
    private BillingService billingService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Bill>> getBillsByUser(@PathVariable Long userId) {
        List<Bill> bills = billingService.getBillsByUserId(userId);
        return ResponseEntity.ok(bills);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<String> downloadBill(@PathVariable Long id) {
        // Simulate PDF download
        return ResponseEntity.ok("PDF download initiated for bill ID: " + id);
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<Bill> payBill(@PathVariable Long id) {
        try {
            Bill bill = billingService.payBill(id);
            return ResponseEntity.ok(bill);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
