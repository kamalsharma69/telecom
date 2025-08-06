package com.telecom.billing.service;

import com.telecom.billing.entity.Bill;
import com.telecom.billing.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BillingService {

    @Autowired
    private BillRepository billRepository;

    public List<Bill> getBillsByUserId(Long userId) {
        return billRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Bill payBill(Long id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));
        
        bill.setStatus("Paid");
        bill.setPaidDate(LocalDate.now());
        
        return billRepository.save(bill);
    }
}
