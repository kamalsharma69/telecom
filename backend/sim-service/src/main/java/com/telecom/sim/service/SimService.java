package com.telecom.sim.service;

import com.telecom.sim.dto.SimActivationRequest;
import com.telecom.sim.dto.SimRequestDto;
import com.telecom.sim.entity.SimCard;
import com.telecom.sim.entity.SimRequest;
import com.telecom.sim.repository.SimCardRepository;
import com.telecom.sim.repository.SimRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class SimService {

    @Autowired
    private SimCardRepository simCardRepository;

    @Autowired
    private SimRequestRepository simRequestRepository;

    private final Random random = new Random();

    public List<SimCard> getSimCardsByUserId(Long userId) {
        return simCardRepository.findByUserId(userId);
    }

    public SimCard activateSim(SimActivationRequest request) {
        // Generate a random phone number
        String phoneNumber = generatePhoneNumber();
        
        SimCard simCard = new SimCard();
        simCard.setNumber(phoneNumber);
        simCard.setUserId(request.getUserId());
        simCard.setPlanId(request.getPlanId());
        simCard.setPlanName(request.getPlanName());
        simCard.setDataTotal(request.getDataTotal());
        simCard.setStatus(SimCard.Status.ACTIVE);
        simCard.setActivationDate(LocalDateTime.now());
        simCard.setExpiryDate(LocalDateTime.now().plusDays(30));

        return simCardRepository.save(simCard);
    }

    public List<SimRequest> getAllSimRequests() {
        return simRequestRepository.findAll();
    }

    public List<SimRequest> getPendingSimRequests() {
        return simRequestRepository.findByStatus(SimRequest.Status.PENDING);
    }

    public SimRequest approveSimRequest(Long id) {
        SimRequest request = simRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SIM request not found"));
        
        request.setStatus(SimRequest.Status.APPROVED);
        request.setProcessedDate(LocalDateTime.now());
        
        return simRequestRepository.save(request);
    }

    public SimRequest rejectSimRequest(Long id) {
        SimRequest request = simRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SIM request not found"));
        
        request.setStatus(SimRequest.Status.REJECTED);
        request.setProcessedDate(LocalDateTime.now());
        
        return simRequestRepository.save(request);
    }

    public SimRequest createSimRequest(SimRequestDto requestDto) {
        SimRequest request = new SimRequest();
        request.setCustomerName(requestDto.getCustomerName());
        request.setEmail(requestDto.getEmail());
        request.setPhoneNumber(requestDto.getPhoneNumber());
        request.setPlanId(requestDto.getPlanId());
        request.setPlanName(requestDto.getPlanName());
        
        return simRequestRepository.save(request);
    }

    public SimCard suspendSim(Long id) {
        SimCard simCard = simCardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SIM card not found"));
        
        simCard.setStatus(SimCard.Status.SUSPENDED);
        return simCardRepository.save(simCard);
    }

    public SimCard reactivateSim(Long id) {
        SimCard simCard = simCardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SIM card not found"));
        
        simCard.setStatus(SimCard.Status.ACTIVE);
        return simCardRepository.save(simCard);
    }

    private String generatePhoneNumber() {
        // Generate a random US phone number
        int areaCode = 555; // Using 555 for demo
        int exchange = random.nextInt(900) + 100; // 100-999
        int number = random.nextInt(9000) + 1000; // 1000-9999
        
        return String.format("+1 (%d) %d-%d", areaCode, exchange, number);
    }
}
