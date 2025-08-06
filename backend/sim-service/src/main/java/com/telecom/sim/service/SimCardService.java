package com.telecom.sim.service;

import com.telecom.sim.dto.SimActivationRequest;
import com.telecom.sim.dto.SimCardDto;
import com.telecom.sim.entity.SimCard;
import com.telecom.sim.repository.SimCardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SimCardService {
    
    private final SimCardRepository simCardRepository;
    private final Random random = new Random();
    
    @Transactional
    public SimCardDto activateSim(SimActivationRequest request) {
        log.info("Activating SIM: {}", request.getSimNumber());
        
        if (simCardRepository.existsBySimNumber(request.getSimNumber())) {
            throw new RuntimeException("SIM number already exists");
        }
        
        String phoneNumber = request.getPhoneNumber();
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            phoneNumber = generatePhoneNumber();
        }
        
        if (simCardRepository.existsByPhoneNumber(phoneNumber)) {
            throw new RuntimeException("Phone number already exists");
        }
        
        SimCard simCard = SimCard.builder()
                .simNumber(request.getSimNumber())
                .phoneNumber(phoneNumber)
                .userId(request.getUserId())
                .planId(request.getPlanId())
                .status(SimCard.SimStatus.ACTIVE)
                .networkType(request.getNetworkType())
                .dataUsedMb(0L)
                .dataLimitMb(calculateDataLimit(request.getPlanId()))
                .signalStrength(85 + random.nextInt(15)) // Random signal between 85-100
                .lastLocation(request.getLocation() != null ? request.getLocation() : "Unknown")
                .activationDate(LocalDateTime.now())
                .expiryDate(LocalDateTime.now().plusYears(1))
                .build();
        
        SimCard savedSim = simCardRepository.save(simCard);
        return mapToDto(savedSim);
    }
    
    public List<SimCardDto> getSimsByUserId(Long userId) {
        log.info("Getting SIMs for user: {}", userId);
        return simCardRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    public List<SimCardDto> getActiveSimsByUserId(Long userId) {
        log.info("Getting active SIMs for user: {}", userId);
        return simCardRepository.findActiveSimsByUserId(userId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    public List<SimCardDto> getPendingActivationRequests() {
        log.info("Getting pending activation requests");
        return simCardRepository.findPendingActivationRequests()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public SimCardDto updateSimStatus(Long simId, SimCard.SimStatus status) {
        log.info("Updating SIM {} status to {}", simId, status);
        
        SimCard simCard = simCardRepository.findById(simId)
                .orElseThrow(() -> new RuntimeException("SIM not found"));
        
        simCard.setStatus(status);
        if (status == SimCard.SimStatus.ACTIVE && simCard.getActivationDate() == null) {
            simCard.setActivationDate(LocalDateTime.now());
        }
        
        SimCard updatedSim = simCardRepository.save(simCard);
        return mapToDto(updatedSim);
    }
    
    @Transactional
    public SimCardDto updateDataUsage(Long simId, Long dataUsedMb) {
        log.info("Updating data usage for SIM {}: {} MB", simId, dataUsedMb);
        
        SimCard simCard = simCardRepository.findById(simId)
                .orElseThrow(() -> new RuntimeException("SIM not found"));
        
        simCard.setDataUsedMb(dataUsedMb);
        
        // Update signal strength randomly (simulating real-time changes)
        simCard.setSignalStrength(70 + random.nextInt(30));
        
        SimCard updatedSim = simCardRepository.save(simCard);
        return mapToDto(updatedSim);
    }
    
    public Optional<SimCardDto> getSimById(Long id) {
        return simCardRepository.findById(id).map(this::mapToDto);
    }
    
    public long getActiveSims() {
        return simCardRepository.countActiveSims();
    }
    
    public long getPendingActivations() {
        return simCardRepository.countPendingActivations();
    }
    
    private String generatePhoneNumber() {
        // Generate a US phone number format: +1 (555) XXX-XXXX
        return String.format("+1 (555) %03d-%04d", 
                100 + random.nextInt(900), 
                1000 + random.nextInt(9000));
    }
    
    private Long calculateDataLimit(Long planId) {
        // Basic data limits based on plan ID (in MB)
        switch (planId.intValue()) {
            case 1: return 5 * 1024L; // 5 GB
            case 2: return 15 * 1024L; // 15 GB
            case 3: return 50 * 1024L; // 50 GB
            default: return 10 * 1024L; // Default 10 GB
        }
    }
    
    private SimCardDto mapToDto(SimCard simCard) {
        return SimCardDto.builder()
                .id(simCard.getId())
                .simNumber(simCard.getSimNumber())
                .phoneNumber(simCard.getPhoneNumber())
                .userId(simCard.getUserId())
                .planId(simCard.getPlanId())
                .status(simCard.getStatus())
                .networkType(simCard.getNetworkType())
                .dataUsedMb(simCard.getDataUsedMb())
                .dataLimitMb(simCard.getDataLimitMb())
                .signalStrength(simCard.getSignalStrength())
                .lastLocation(simCard.getLastLocation())
                .activationDate(simCard.getActivationDate())
                .expiryDate(simCard.getExpiryDate())
                .build();
    }
}
