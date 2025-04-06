
import { Link } from "react-router-dom";
import { Calculator, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold">Abacus Academy</h3>
          </div>
          <p className="text-muted-foreground">
            Empowering students with mental math skills through abacus training since 2005.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/exams" className="text-muted-foreground hover:text-primary transition-colors">
                Exams
              </Link>
            </li>
            <li>
              <Link to="/practice" className="text-muted-foreground hover:text-primary transition-colors">
                Practice Papers
              </Link>
            </li>
            <li>
              <Link to="/progress" className="text-muted-foreground hover:text-primary transition-colors">
                Progress Tracker
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/request-demo" className="text-muted-foreground hover:text-primary transition-colors">
                Request a Demo
              </Link>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <span className="text-muted-foreground">123 Abacus Street, Mathville, MV 12345</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">info@abacusacademy.com</span>
          </div>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t">
        <p className="text-center text-muted-foreground">
          © {new Date().getFullYear()} Abacus Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
