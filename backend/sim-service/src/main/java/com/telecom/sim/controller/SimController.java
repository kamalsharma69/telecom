package com.telecom.sim.controller;

import com.telecom.sim.dto.SimActivationRequest;
import com.telecom.sim.dto.SimCardDto;
import com.telecom.sim.entity.SimCard;
import com.telecom.sim.service.SimCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sims")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class SimController {
    
    private final SimCardService simCardService;
    
    @PostMapping("/activate")
    public ResponseEntity<SimCardDto> activateSim(@Valid @RequestBody SimActivationRequest request) {
        try {
            log.info("SIM activation request received: {}", request.getSimNumber());
            SimCardDto response = simCardService.activateSim(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("SIM activation failed: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SimCardDto>> getSimsByUserId(@PathVariable Long userId) {
        try {
            List<SimCardDto> sims = simCardService.getSimsByUserId(userId);
            return ResponseEntity.ok(sims);
        } catch (Exception e) {
            log.error("Failed to get SIMs for user {}: {}", userId, e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/user/{userId}/active")
    public ResponseEntity<List<SimCardDto>> getActiveSimsByUserId(@PathVariable Long userId) {
        try {
            List<SimCardDto> sims = simCardService.getActiveSimsByUserId(userId);
            return ResponseEntity.ok(sims);
        } catch (Exception e) {
            log.error("Failed to get active SIMs for user {}: {}", userId, e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/pending")
    public ResponseEntity<List<SimCardDto>> getPendingActivations() {
        try {
            List<SimCardDto> pendingSims = simCardService.getPendingActivationRequests();
            return ResponseEntity.ok(pendingSims);
        } catch (Exception e) {
            log.error("Failed to get pending activations: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{simId}/status")
    public ResponseEntity<SimCardDto> updateSimStatus(
            @PathVariable Long simId, 
            @RequestParam SimCard.SimStatus status) {
        try {
            SimCardDto updatedSim = simCardService.updateSimStatus(simId, status);
            return ResponseEntity.ok(updatedSim);
        } catch (Exception e) {
            log.error("Failed to update SIM status: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{simId}/data-usage")
    public ResponseEntity<SimCardDto> updateDataUsage(
            @PathVariable Long simId, 
            @RequestParam Long dataUsedMb) {
        try {
            SimCardDto updatedSim = simCardService.updateDataUsage(simId, dataUsedMb);
            return ResponseEntity.ok(updatedSim);
        } catch (Exception e) {
            log.error("Failed to update data usage: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{simId}")
    public ResponseEntity<SimCardDto> getSimById(@PathVariable Long simId) {
        return simCardService.getSimById(simId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/stats/active-count")
    public ResponseEntity<Long> getActiveSimsCount() {
        long count = simCardService.getActiveSims();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/stats/pending-count")
    public ResponseEntity<Long> getPendingActivationsCount() {
        long count = simCardService.getPendingActivations();
        return ResponseEntity.ok(count);
    }
}
