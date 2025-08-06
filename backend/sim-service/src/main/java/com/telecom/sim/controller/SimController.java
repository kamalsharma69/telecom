package com.telecom.sim.controller;

import com.telecom.sim.dto.SimActivationRequest;
import com.telecom.sim.dto.SimRequestDto;
import com.telecom.sim.entity.SimCard;
import com.telecom.sim.entity.SimRequest;
import com.telecom.sim.service.SimService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sims")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class SimController {

    @Autowired
    private SimService simService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SimCard>> getSimCardsByUser(@PathVariable Long userId) {
        List<SimCard> simCards = simService.getSimCardsByUserId(userId);
        return ResponseEntity.ok(simCards);
    }

    @PostMapping("/activate")
    public ResponseEntity<SimCard> activateSim(@Valid @RequestBody SimActivationRequest request) {
        try {
            SimCard simCard = simService.activateSim(request);
            return ResponseEntity.ok(simCard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/requests")
    public ResponseEntity<List<SimRequest>> getSimRequests() {
        List<SimRequest> requests = simService.getAllSimRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/requests/pending")
    public ResponseEntity<List<SimRequest>> getPendingSimRequests() {
        List<SimRequest> requests = simService.getPendingSimRequests();
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/requests/{id}/approve")
    public ResponseEntity<SimRequest> approveSimRequest(@PathVariable Long id) {
        try {
            SimRequest request = simService.approveSimRequest(id);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/requests/{id}/reject")
    public ResponseEntity<SimRequest> rejectSimRequest(@PathVariable Long id) {
        try {
            SimRequest request = simService.rejectSimRequest(id);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/requests")
    public ResponseEntity<SimRequest> createSimRequest(@Valid @RequestBody SimRequestDto requestDto) {
        try {
            SimRequest request = simService.createSimRequest(requestDto);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/suspend")
    public ResponseEntity<SimCard> suspendSim(@PathVariable Long id) {
        try {
            SimCard simCard = simService.suspendSim(id);
            return ResponseEntity.ok(simCard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/reactivate")
    public ResponseEntity<SimCard> reactivateSim(@PathVariable Long id) {
        try {
            SimCard simCard = simService.reactivateSim(id);
            return ResponseEntity.ok(simCard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
