package com.vulnscan.controller;

import com.vulnscan.modal.ScanRequest;
import com.vulnscan.modal.ScanResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Adjust for your frontend URL
public class ScanController {

    @PostMapping("/scan")
    public ResponseEntity<?> scan(@RequestBody ScanRequest scanRequest) {
        String ip = scanRequest.getIpOrDomain();
        String tool = scanRequest.getTool();
        String result = executePythonScript(tool, ip);

        // Assuming 'completed' is a status string for now
        String status = "completed";
        ScanResponse scanResponse = new ScanResponse(tool, ip, status, result);

        return ResponseEntity.ok(scanResponse);
    }

    private String executePythonScript(String tool, String ip) {
        String scriptPath = "python-scripts/main.py";  // Adjust path as needed
        String command = String.format("python %s '%s' '%s'", scriptPath, tool, ip);

        try {
            ProcessBuilder processBuilder = new ProcessBuilder("python", scriptPath, tool, ip);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            process.waitFor();
            return output.toString();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error executing script", e);
        }
    }
}
