package com.hashhazard.wordsearchapi.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hashhazard.wordsearchapi.services.WordGridService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "https://wordsearch-puzzle.vercel.app")
// @CrossOrigin(origins = "*")
// @CrossOrigin(origins = "http://localhost:5173")
public class WordSearchController {

    @Autowired
    WordGridService wordGridService;

    @GetMapping("/wordgrid")
    public String createWordGrid(@RequestParam("gridSize") int gridSize, @RequestParam("wordList") String wordList) {
        if (wordList.length() == 0)
            wordList = "BUG,WRATH,ERROR,POODLE";

        List<String> words = Arrays.asList(wordList.split(","));
        char[][] grid = wordGridService.generateGrid(gridSize, words);
        String gridToString = "";
        for (int i = 0; i < gridSize; i++) {
            for (int j = 0; j < gridSize; j++) {
                gridToString += grid[i][j] + " ";
            }
            // gridToString += "\r\n";

        }

        System.out.println(words);
        return gridToString;
    }
}
