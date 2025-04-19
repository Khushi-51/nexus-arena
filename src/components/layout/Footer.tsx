
import React from "react";
import { Github, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-monad-primary/20 mt-auto py-6">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              Powered by{" "}
              <a
                href="https://monad.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-monad-secondary hover:underline"
              >
                Monad
              </a>
              {" "}high-performance Layer-1 blockchain
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
          
          <div className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Monad Crypto Heroes. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
